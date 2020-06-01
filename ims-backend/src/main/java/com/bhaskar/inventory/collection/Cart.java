package com.bhaskar.inventory.collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Map;

@Data
@Document("cart")
public class Cart implements Serializable {
    @Id
    private String cartId;
    private String userId;
    private Map<String,Integer> skuCount;
}
