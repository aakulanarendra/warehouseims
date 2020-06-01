package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Customer;
import com.bhaskar.inventory.repo.CustomRepo;
import com.bhaskar.inventory.repo.CustomerRepository;
import com.bhaskar.inventory.repo.OrderRepository;
import com.bhaskar.inventory.response.CustomerRes;
import com.bhaskar.inventory.response.OrderRes;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class ProductConfigController {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final CustomRepo customRepo;

    @Autowired
    public ProductConfigController(CustomerRepository customerRepository, OrderRepository orderRepository, CustomRepo customRepo) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.customRepo = customRepo;
    }


    @GetMapping("/subcategory")
    @ApiOperation(value = "Get Customers")
    public @ResponseBody
    ResponseEntity<?> listCustomerNames() {
        List<Customer> customerList = customerRepository.getCustomersBy();
        return ResponseEntity.ok(customerList);
    }

}
