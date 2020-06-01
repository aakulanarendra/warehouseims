package com.bhaskar.inventory.service;

import com.bhaskar.inventory.collection.Customer;
import com.bhaskar.inventory.collection.Offer;
import com.bhaskar.inventory.collection.Order;
import com.bhaskar.inventory.dto.OrderDetails;
import com.bhaskar.inventory.dto.OrderProduct;
import com.bhaskar.inventory.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OfferRepository offerRepository;
    private final CustomRepo customRepo;
    private final CustomerRepository customerRepository;


    @Autowired
    public OrderService(ProductRepository productRepository, OrderRepository orderRepository,
                        OfferRepository offerRepository, CustomRepo customRepo,
                        CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.offerRepository = offerRepository;
        this.customRepo = customRepo;
        this.customerRepository = customerRepository;
    }


    public OrderDetails getOrder(String orderId){
        List<Order> orders = orderRepository.findById(orderId).map(Collections::singletonList).orElse(new ArrayList<>());
        return getOrders(orders).stream().findFirst().orElse(new OrderDetails());
    }

    public Customer getOrderCustomer(String orderId){
        Order order = orderRepository.findOrderCustomerByOrderId(orderId);
        return customerRepository.findById(Optional.ofNullable(order.getCustomer()).orElse(new com.bhaskar.inventory.dto.Customer()).getCustomerId()).orElse(new Customer());
    }

    public List<OrderDetails> getOrders(){
        List<Order> orders = orderRepository.findAll();
        return getOrders(orders);
    }

    public List<OrderDetails> getOrders(List<Order> orders){
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        Map<String, BigDecimal> amountMap = new HashMap<>();

        for (Order order : orders) {
            List<OrderProduct> orderProducts = new ArrayList<>();
            OrderDetails orderDetails = new OrderDetails();
            BigDecimal discountAmnt = BigDecimal.ZERO;

            orderDetails.setCreated(order.getCreated());
            orderDetails.setOrderId(order.getOrderId());
            orderDetails.setStatus(order.getStatus());
            orderDetails.setCustomer(order.getCustomer().getCustomerName());
            orderDetails.setDiscount(order.getDiscount());

            order.getProducts().forEach(productInfo -> {
                OrderProduct orderProduct = new OrderProduct();
                productRepository.findById(productInfo.getProductId()).ifPresent(product -> {

                    orderProduct.setDiscount(BigDecimal.ZERO);
                    Optional.ofNullable(productInfo.getOfferId()).ifPresent(offerId-> {
                        orderProduct.setDiscount(offerRepository
                                .findById(productInfo.getOfferId())
                                .map(Offer::getDiscount)
                                .orElse(BigDecimal.ZERO)
                        );
                    });

                    orderProduct.setSku(product.getProductId());
                    orderProduct.setSkuName(product.getBasicInfo().getProductName());
                    orderProduct.setImageUrls(product.getBasicInfo().getImageUrls());

                    BigDecimal totalPrice = product.getBasicInfo().getSalePrice()
                            .multiply(BigDecimal.valueOf(productInfo.getQuantity()));
                    BigDecimal discountedAmount = product.getBasicInfo().getSalePrice()
                            .multiply(BigDecimal.valueOf(productInfo.getQuantity()))
                            .multiply(orderProduct.getDiscount())
                            .divide(new BigDecimal(100));
                    BigDecimal value = amountMap.get("amount");

                    amountMap.put("amount", Optional.ofNullable(value).orElse(BigDecimal.ZERO).add(discountedAmount));

                    orderProduct.setTotal(totalPrice.subtract(discountedAmount));
                    orderProduct.setQuantity(productInfo.getQuantity());
                    orderProduct.setPrice(product.getBasicInfo().getSalePrice());
                    orderProduct.setTax(productInfo.getTax());
                });

                orderProducts.add(orderProduct);
            });
            final double orderTotal = orderProducts.stream().mapToDouble(orderPrd -> Optional.ofNullable(orderPrd.getTotal()).orElse(BigDecimal.ZERO).doubleValue()).sum();
            final double taxAmount = orderProducts.stream()
                    .mapToDouble(orderPrd -> Optional.ofNullable(orderPrd.getTotal()).orElse(BigDecimal.ZERO)
                            .multiply(Optional.ofNullable(orderPrd.getTax()).orElse(BigDecimal.ZERO)
                            .multiply(new BigDecimal(0.01))).doubleValue())
                    .sum();
            orderDetails.setTotal(BigDecimal.valueOf(orderTotal));
            orderDetails.setProducts(orderProducts);
            orderDetails.setDiscountAmount(amountMap.get("amount"));
            orderDetails.setShippingAmount(order.getShippingAmount());
            orderDetails.setTaxAmount(BigDecimal.valueOf(taxAmount));
            orderDetailsList.add(orderDetails);
        }

        return orderDetailsList;

    }

    public Order placeOrder(Order order){
        Order savedOrder = orderRepository.save(order);
        order.getProducts().forEach(productInfo -> {
            customRepo.reserveInventory(productInfo.getProductId(),productInfo.getQuantity());
        });
        return savedOrder;
    }

    public OrderDetails updateOrderStatus(OrderDetails orderDetails){
        customRepo.updateOrderStatus(orderDetails.getOrderId(),orderDetails.getStatus());
        if(orderDetails.getStatus().equalsIgnoreCase("Completed")){
            orderDetails.getProducts().forEach(orderProduct -> {
                customRepo.updateInventory(orderProduct.getSku(),0,-orderProduct.getQuantity());
            });
        }else if(orderDetails.getStatus().equalsIgnoreCase("Cancelled")){
            orderDetails.getProducts().forEach(orderProduct -> {
                customRepo.updateInventory(orderProduct.getSku(),orderProduct.getQuantity(),-orderProduct.getQuantity());
            });
        }
        return orderDetails;
    }
}
