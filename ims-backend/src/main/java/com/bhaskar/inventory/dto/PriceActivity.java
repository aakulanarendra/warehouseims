package com.bhaskar.inventory.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
public class PriceActivity {
    public PriceActivity(BigDecimal salePrice, BigDecimal retailPrice) {
        this.salePrice = salePrice;
        this.retailPrice = retailPrice;
    }

    private BigDecimal salePrice;
    private BigDecimal retailPrice;
    private Date created = new Date();
}
