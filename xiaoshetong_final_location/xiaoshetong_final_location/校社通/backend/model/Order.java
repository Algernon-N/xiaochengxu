package com.example.xiaoshetong.model;

import java.math.BigDecimal;

public class Order {
    private String id;
    private Integer serviceTypeIndex;
    private String serviceTypeName;
    private String pickupCode;
    private String destination;
    private BigDecimal amount;
    private String remark;
    private String demanderName;
    private String demanderStudentId;
    private String riderStudentId;
    private String currentState; // "pending", "accepted", "delivered" 等
    private String campus;

    // TODO: ここに各フィールドの Getter と Setter を生成してください
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCurrentState() { return currentState; }
    public void setCurrentState(String currentState) { this.currentState = currentState; }
    // ... その他のgetter/setter
}
