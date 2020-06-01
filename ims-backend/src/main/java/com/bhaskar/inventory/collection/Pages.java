package com.bhaskar.inventory.collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("pages")
@Data
public class Pages {
    @Id
    private String id;
    private String label;
    private String link;
    private String icon;
    private String type;
    private Integer order;
    private List<Pages> childPages;
}
