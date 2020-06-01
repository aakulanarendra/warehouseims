package com.bhaskar.inventory.collection;

import com.bhaskar.inventory.collection.product.*;
import com.bhaskar.inventory.dto.Inventory;
import com.bhaskar.inventory.dto.PriceActivity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("product")
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {
    @Id
    private String productId;
    private BasicInfo basicInfo;
    private Dimensions dimensions;
    private ProductUrl productUrl;
    private Logistics logistics;
    private Packaging packaging;
    private Attributes attributes;
    private List<PriceActivity> prices;
    private Inventory inventory;
}
