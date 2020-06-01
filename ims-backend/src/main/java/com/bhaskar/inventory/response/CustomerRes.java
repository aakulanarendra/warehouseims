package com.bhaskar.inventory.response;

import lombok.Data;

import java.util.List;

@Data
public class CustomerRes {
    private String customerId;
    private String customerName;
    private Double rating;
    private String phone;
    private List<String> tags;
    private List<OrderRes> orders;
    private String role;
}
