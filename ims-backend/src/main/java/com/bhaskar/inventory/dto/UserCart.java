package com.bhaskar.inventory.dto;

import com.bhaskar.inventory.collection.Sku;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCart extends Sku {
     private Integer cartAdded;
}
