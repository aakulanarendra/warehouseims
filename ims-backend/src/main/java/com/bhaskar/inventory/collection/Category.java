package com.bhaskar.inventory.collection;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Document(collection = "category")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class Category  {
    @Transient
    public static final String SEQUENCE_NAME = "category_sequence";
    @Indexed
    @Id
    private String categoryCode;  // Unique Category Code, acts as primary key
    @NotNull(message = "Name Should not be null or empty")
    private String categoryName;  // Name of the category to be displayed in site
    private String description; // Detailed Description about the category
    private List<String> searchTerms;  // Search Term can be as "men"
    private List<String> imageUrls;
    private BigDecimal tax;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssZ", timezone = "America/Chicago")
    private Date createdOn = new Date();  // current timestamp
}
