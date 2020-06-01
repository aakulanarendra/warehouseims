package com.bhaskar.inventory.collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document("customer")
public class Customer implements Serializable {

    @Transient
    public static final String SEQUENCE_NAME = "customer_sequence";
    @Id
    private String customerId;
    private String firstName;
    private String lastName;
    private String phone;
    private Double rating;
    private String userName;
    private String password;
    private String roles;
    private List<Address> addressList;
}
