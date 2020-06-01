package com.bhaskar.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderReq {
    private String orderTotal;
    private String userId;
    private List<OrderProductReq> orderProducts;
    private Discount discount;
    private Date created = new Date();
    private Date updated = new Date();
    private String orderStatus;
}
