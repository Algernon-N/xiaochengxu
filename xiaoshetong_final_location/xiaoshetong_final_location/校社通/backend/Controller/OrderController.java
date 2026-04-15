package com.example.xiaoshetong.controller;

import com.example.xiaoshetong.model.Order;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // 開発環境用
public class OrderController {

    // データベースの代わりとなる一時リスト
    private List<Order> orderDatabase = new ArrayList<>();

    // 注文一覧の取得（校区でフィルタリング）
    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@RequestParam(required = false) String campus) {
        if (campus == null || campus.isEmpty()) {
            return ResponseEntity.ok(orderDatabase);
        }
        List<Order> filtered = orderDatabase.stream()
                .filter(o -> campus.equals(o.getCampus()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(filtered);
    }

    // 注文の作成
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // バックエンド側でIDと初期状態を付与する
        order.setId(String.valueOf(System.currentTimeMillis()));
        order.setCurrentState("pending");
        
        orderDatabase.add(order);
        return ResponseEntity.ok(order);
    }
}
