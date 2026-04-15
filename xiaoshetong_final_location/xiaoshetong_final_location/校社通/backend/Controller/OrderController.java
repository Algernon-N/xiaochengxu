package com.example.xiaoshetong.controller; // 声明当前所在的包

import com.example.xiaoshetong.model.Order; // 引入刚才建好的 Order 类
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") 
public class OrderController {
    // ... 保留之前的接口逻辑 ...
}