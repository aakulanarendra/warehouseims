package com.bhaskar.inventory.dto;

import lombok.Data;

@Data
public class PriceUpdate {
    private String priceId;
    private PriceActivity priceActivity;
}
