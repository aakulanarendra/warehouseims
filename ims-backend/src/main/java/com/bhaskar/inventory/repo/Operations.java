

package com.bhaskar.inventory.repo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoOperations;


public abstract class Operations {

    @Autowired
    @Qualifier("mongoTemplate")
    public MongoOperations mongoOperations;
}
