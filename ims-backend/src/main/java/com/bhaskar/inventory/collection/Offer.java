package com.bhaskar.inventory.collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
@Document("offer")
public class Offer implements Serializable {
    @Id
    private String offerId;
    private String promoType;
    private String promoCode;
    private String promoDesc;
    private BigDecimal threshold;
    private BigDecimal discount;
    private List<String> excludedSku;
}
