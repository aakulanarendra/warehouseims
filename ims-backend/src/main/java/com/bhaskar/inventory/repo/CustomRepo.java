package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.*;
import com.bhaskar.inventory.dto.AuthRes;
import com.bhaskar.inventory.dto.Dashboard;
import com.bhaskar.inventory.dto.PriceActivity;
import com.bhaskar.inventory.dto.TopProduct;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.data.mongodb.core.aggregation.ConvertOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public class CustomRepo extends Operations {
    public void updateOrderStatus(String orderId, String status) {
        Query query = new Query().addCriteria(where("orderId").is(orderId));
        Update update = new Update();
        update.set("status", status);
        mongoOperations.upsert(query, update, "order");
    }

    public List<Product> searchProducts(String searchTerm) {
        Query query = new Query().addCriteria(
                new Criteria().orOperator(
                        Criteria.where("basicInfo.barcode").regex(searchTerm,"i"),
                        Criteria.where("basicInfo.productName").regex(searchTerm,"i"),
                        Criteria.where("basicInfo.description").regex(searchTerm,"i"),
                        Criteria.where("basicInfo.sku").regex(searchTerm,"i"),
                        Criteria.where("basicInfo.category").regex(searchTerm,"i")
                )
        );
        return mongoOperations.find(query, Product.class);
    }

    public void reserveInventory(String barcode, Integer quantity) {
        Query query = new Query().addCriteria(where("_id").is(barcode));
        Update update = new Update();
        update.inc("inventory.stock", -quantity);
        update.inc("inventory.reserved", quantity);
        mongoOperations.upsert(query, update, "product");
    }

    public void addAttribute(String type, Object value) {
        Query query = new Query().addCriteria(where("_id").is("1"));
        long count = mongoOperations.count(query, Attributes.class);
        if (count == 0) {
            Attributes attributes = new Attributes();
            attributes.setAttributeId("1");
            mongoOperations.save(attributes);
        }

        Update update = new Update();
        update.addToSet(type, value);
        mongoOperations.upsert(query, update, "attributes");
    }

    public BigDecimal getTax() {
        Query query = new Query().addCriteria(where("_id").is("1"));
        query.fields().include("tax");
        List<Attributes> attributes = mongoOperations.find(query, Attributes.class);
        return Optional.ofNullable(attributes).orElse(new ArrayList<>()).stream().findFirst().map(Attributes::getTax).orElse(BigDecimal.ZERO);
    }

    public void updateTax(BigDecimal tax) {
        Query query = new Query().addCriteria(where("_id").is("1"));
        long count = mongoOperations.count(query, Attributes.class);
        if (count == 0) {
            Attributes attributes = new Attributes();
            attributes.setAttributeId("1");
            mongoOperations.save(attributes);
        }

        Update update = new Update();
        update.set("tax", tax);
        mongoOperations.upsert(query, update, "attributes");
    }

    public void updateProduct(Query query, Update update) {
        mongoOperations.upsert(query, update, "product");
    }

    public Product updateProduct(Product product) {
         return mongoOperations.save(product);
    }



    public void updateInventory(String barcode, Integer stock, Integer reserved) {
        Query query = new Query().addCriteria(where("_id").is(barcode));
        Update update = new Update();
        update.inc("inventory.stock", stock);
        update.inc("inventory.reserved", reserved);
        mongoOperations.upsert(query, update, "product");
    }

    public void updateRolePages(List<Pages> pages, String id) {
        Query query = new Query().addCriteria(where("_id").is(id));
        Update update = new Update();
        update.set("pages", pages);
        mongoOperations.upsert(query, update, "roles");
    }

    public void updateUsersRole(List<String> users, String id) {
        Query query = new Query().addCriteria(where("customerId").in(users));
        Update update = new Update();
        update.set("roles", id);
        mongoOperations.upsert(query, update, "customer");
    }

    public AuthRes authUser(Customer customer) {
        Query query = new Query().addCriteria(where("userName").is(customer.getUserName()).and("password").is(customer.getPassword()));
        List<Customer> customerList = mongoOperations.find(query, Customer.class);

        if (customerList.isEmpty()) {
            return new AuthRes(false);
        }

        AuthRes authRes = new AuthRes();
        customerList.stream().findFirst().ifPresent(cust -> {
            if (cust.getUserName().equalsIgnoreCase("superadmin")) {
                authRes.setAuthorized(true);
                authRes.setCustomerName(cust.getFirstName() + " " + cust.getLastName());
                List<Pages> pages = mongoOperations.findAll(Pages.class);
                authRes.setPages(pages);
                authRes.setRole("superadmin");
            } else {
                String roleID = cust.getRoles();
                Role role = mongoOperations.findOne(new Query().addCriteria(where("_id").is(roleID)), Role.class);
                authRes.setAuthorized(true);
                authRes.setCustomerName(cust.getFirstName() + " " + cust.getLastName());
                List<String> pageIds = role.getPages().stream().map(Pages::getId).collect(Collectors.toList());
                List<Pages> pages = mongoOperations.find(new Query().addCriteria(where("_id").in(pageIds)), Pages.class);
                authRes.setPages(pages);
                authRes.setRole(role.getRole());
            }
        });
        return authRes;
    }

    public Dashboard getDashboardInfo() {
        Dashboard dashboard = new Dashboard();
        Query query = new Query();
        Long users = mongoOperations.count(query, Customer.class);
        Long products = mongoOperations.count(query, Product.class);
        Long orders = mongoOperations.count(query, Order.class);
        dashboard.setOrders(orders);
        dashboard.setUsers(users);
        dashboard.setProducts(products);

        ConvertOperators.ConvertOperatorFactory convertOperators = new ConvertOperators.ConvertOperatorFactory("$products.price");
        ArithmeticOperators.ArithmeticOperatorFactory multiply = new ArithmeticOperators.ArithmeticOperatorFactory(convertOperators.convertToDouble());

        Aggregation agg = newAggregation(
                unwind("products"),
                group("$products.productId").sum("$products.quantity").as("count")
                        .sum(multiply.multiplyBy("$products.quantity")).as("price"),
                sort(Sort.Direction.DESC, "count"),
                limit(5)
        );


        AggregationResults<TopProduct> groupResults = mongoOperations.aggregate(agg, Order.class, TopProduct.class);
        List<TopProduct> result = groupResults.getMappedResults();
        dashboard.setTopProducts(result);

        Aggregation aggPrice = newAggregation(
                unwind("products"),
                group()
                        .sum(multiply.multiplyBy("$products.quantity")).as("price"),
                limit(1)
        );
        AggregationResults<TopProduct> priceResults = mongoOperations.aggregate(aggPrice, Order.class, TopProduct.class);
        List<TopProduct> priceResult = priceResults.getMappedResults();
        priceResult.stream().findFirst().ifPresent(priceResultObj -> {
            dashboard.setTotalAmount(BigDecimal.valueOf(priceResultObj.getPrice()));
        });

        return dashboard;
    }
}
