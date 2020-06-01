package com.bhaskar.inventory.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class OrderRes {
    private String orderId;
    private String orderStatus;
    private BigDecimal orderTotal;
    private Date orderDate;
}
