package com.bhaskar.inventory.collection;

import lombok.Data;

@Data
public class Address {
    private String addressLineOne;
    private String addressLineTwo;
    private String city;
    private String state;
    private String country;
    private String primary;
}
