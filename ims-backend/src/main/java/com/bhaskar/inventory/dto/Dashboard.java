package com.bhaskar.inventory.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class Dashboard {
    private Long users;
    private Long orders;
    private Long products;
    private BigDecimal totalAmount;
    private List<TopProduct> topProducts;
    private List<TopCategory> topCategories;
}
