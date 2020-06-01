package com.bhaskar.inventory.collection.product;

import lombok.Data;

@Data
public class Logistics {
    private String barcodeNbr;
    private String issueInventoryLocation;
    private String receiveInventoryLocation;
    private String safetyStock;
    private String binNumber;
    private String salesForecast;
    private String leadTime;
}
