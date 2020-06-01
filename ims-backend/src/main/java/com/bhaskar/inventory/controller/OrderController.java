package com.bhaskar.inventory.controller;

import com.bhaskar.inventory.collection.Order;
import com.bhaskar.inventory.dto.OrderDetails;
import com.bhaskar.inventory.service.OrderService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("{id}")
    @ApiOperation(value = "Get OrderInfo")
    public @ResponseBody
    ResponseEntity<?> getOrder(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @GetMapping("{id}/customer")
    @ApiOperation(value = "Get OrderInfo")
    public @ResponseBody
    ResponseEntity<?> getOrderCustomer(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.getOrderCustomer(id));
    }

    @GetMapping("list")
    @ApiOperation(value = "Get Orders")
    public @ResponseBody
    ResponseEntity<?> listOrders() {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @PostMapping("place")
    @ApiOperation(value = "Place an Order")
    public @ResponseBody
    ResponseEntity<?> placeOrder(@RequestBody Order orderReq) {
        return ResponseEntity.ok(orderService.placeOrder(orderReq));
    }

    @PostMapping("status/{orderId}")
    @ApiOperation(value = "Price Update")
    public @ResponseBody
    ResponseEntity<?> updateOrderStatus(@RequestBody OrderDetails orderDetails) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderDetails));
    }
}
