package com.bhaskar.inventory.collection;

import com.bhaskar.inventory.dto.Customer;
import com.bhaskar.inventory.dto.Discount;
import com.bhaskar.inventory.dto.ProductInfo;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Document("order")
public class Order implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "orders_sequence";

    @Id
    private String orderId;
    private Date created = new Date();
    private Date lastUpdated = new Date();
    private String status;
    private Customer customer;
    private BigDecimal shippingAmount;
    private String shipmentType;
    private Discount discount;
    private List<ProductInfo> products;
}
