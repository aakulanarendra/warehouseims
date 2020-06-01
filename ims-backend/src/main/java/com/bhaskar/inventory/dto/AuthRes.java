package com.bhaskar.inventory.dto;

import com.bhaskar.inventory.collection.Pages;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthRes {
    private String customerId;
    private String customerName;
    private boolean authorized;
    private String role;
    private List<Pages> pages;

    public AuthRes(boolean authorized) {
        this.authorized = authorized;
    }


}
