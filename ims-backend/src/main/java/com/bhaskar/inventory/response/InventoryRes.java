package com.bhaskar.inventory.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class InventoryRes {
    private List<String> skuImageUrl;
    private String productId;
    private String inventoryId;
    private String productName;
    private String barcode;
    private BigDecimal salePrice;
    private BigDecimal retailPrice;
    private BigDecimal tax;
    private Integer stock;

}
