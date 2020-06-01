package com.bhaskar.inventory.collection.product;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class BasicInfo {
    private String barcode;
    private String sku;
    private String productName;
    private String description;

    private String uom;
    private String category;
    private String department;

    private BigDecimal retailPrice;
    private BigDecimal salePrice;
    private BigDecimal tax;

    private String reOrderThreshold;
    private Integer stock;
    private String bin;

    private Date expiryDate;
    private List<String> imageUrls;
}
