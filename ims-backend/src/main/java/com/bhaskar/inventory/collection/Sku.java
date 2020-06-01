package com.bhaskar.inventory.collection;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
//@Document("sku")
public class Sku implements Serializable {
    private String skuId;
    private String skuName;
    private Double price;
    private Double offerPrice;
    private List<String> skuDesc;
}
