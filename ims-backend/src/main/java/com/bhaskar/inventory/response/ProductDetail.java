package com.bhaskar.inventory.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDetail {
    private String barcode;
    private List<String> imageUrls;
    private String name;
    private String desc;
    private Integer available;
    private BigDecimal salePrice;
    private BigDecimal tax;
}
