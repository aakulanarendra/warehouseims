package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Category;
import com.bhaskar.inventory.collection.Customer;
import com.bhaskar.inventory.collection.Order;
import com.bhaskar.inventory.repo.sequence.SequenceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class CascadeSaveMongoEventListener extends AbstractMongoEventListener<Object> {

    @Autowired
    SequenceRepo sequenceRepo;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Object> event) {
        Object source = event.getSource();
        if (source instanceof Order) {
            ((Order) source).setOrderId(String.valueOf("O90195"+sequenceRepo.generateSequence(Order.SEQUENCE_NAME)));
        }else if (source instanceof Customer) {
            ((Customer) source).setCustomerId(String.valueOf("C90195"+sequenceRepo.generateSequence(Customer.SEQUENCE_NAME)));
        }else if (source instanceof Category){
            ((Category) source).setCategoryCode(String.valueOf("C70195"+sequenceRepo.generateSequence(Category.SEQUENCE_NAME)));
        }
    }
}