package io.jpghdev.restapi.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue
    public int id;    
    public String name;
    public int idM;
    public int idP;
}
