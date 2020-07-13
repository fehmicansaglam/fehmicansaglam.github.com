---
title: "Rust ile json serialization"
description: ""
category: rust
---
Bugün Rust ekosisteminde json serialization/deserialization tarafında neler olduğuna bakmak istedim. İlk arama sonucu olarak karşıma [serde](https://github.com/serde-rs/json) çıktı. Kullanmak için önce `Cargo.toml` dosyasına aşağıdaki satırları eklemek gerekiyor.

```rust
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

Şimdi de json'dan deserialize etmek üzere bir Server struct tanımlayalım.

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Server {
    name: String,
    memory: u64,
    ipAddresses: Vec<String>,
}
```

Artık bir json string'den Server elde etmek oldukça kolay.

```rust
let data = r#"
    {
        "name": "Monty Python",
        "memory": 17179869184,
        "ipAddresses": [
            "10.0.0.1",
            "10.0.0.2"
        ]
    }"#;

let server: Server = serde_json::from_str(data)?;

println!("{} is at {}", server.name, server.ipAddresses[0]);
```

`json!` macrosu ile doğrudan json oluşturabiliyoruz.

```rust
let name = "Monty Python";
let memory = 17179869184u64;

let server = json!({
    "name": name,
    "memory": memory,
    "ipAddresses": [
        "10.0.0.1",
        "10.0.0.2"
    ]
});

println!("{}", server.to_string());
```

Json transformation da beklediğimden çok daha kolay oldu.

```rust
let name = "Monty Python";
let memory = 17179869184u64;

let mut server = json!({
    "name": name,
    "memory": memory,
    "ipAddresses": [
        "10.0.0.1",
        "10.0.0.2"
    ]
});

server["memory"] = Value::String("16GB".to_owned());

println!("{}", server.to_string());
```

Daha karmaşık bir json'ı da transform etmek mümkün.

```rust
let name = "Monty Python";
let memory = 17179869184u64;

let mut server = json!({
    "name": name,
    "memory": memory,
    "ipAddresses": [
        {
            "address": "10.0.0.1"
        }
    ]
});

server["ipAddresses"][0]["address"] = Value::String("10.0.0.2".to_owned());

println!("{}", server.to_string());
```

Yarın başka bir konu ile görüşmek üzere👋
