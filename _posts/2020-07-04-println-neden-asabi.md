---
title: "println! neden asabi?"
description: ""
category: rust
---
Cargo, Rust'ın paket yöneticisi. Yeni proje oluşturmak, projeyi build etmek, test etmek, bağımlılıkları indirmek gibi işlerin hepsini cargo ile yapıyoruz. Örneğin yeni bir proje oluşturmak için aşağıdaki komut kullanılıyor:

```
cargo new rust-gunlugu
```

Bu komut ile rust-gunlugu dizini altında basit bir "Merhaba Dünya!" şablonu elde ediyoruz.

```
├── Cargo.toml
└── src
    └── main.rs
```

*main.rs* dosyası içindeki *main* fonksiyonu uygulamamızın giriş noktası. Oluşan koda bakarsak uygulamamızın "*Hello World!*" diye çığlık attığını görüyoruz.

```rust
fn main() {
    println!("Hello, world!");
}
```

Hemen hemen tüm programlama dillerinin buna benzer "Merhaba Dünya!" uygulaması vardır ve bunu *!* işareti ile çığlık atarak yapar. Fakat Rust *println!* çağrısında bile bize bağırıyor. Bunun nedeni *println!*'in aslında bir fonksiyon değil **makro** olması. Makrolar derleyici tarafından Rust koduna genişletiliyorlar ve sonrasında tekrar derleniyorlar.

println! makrosunun derlendiği kodu görebilmek için [cargo-expand](https://github.com/dtolnay/cargo-expand) projesinden faydalanacağım. Aşağıdaki komut ile hızlıca yükleyebiliyoruz.

```
cargo install cargo-expand
```

Bu komutu kullanabilmek için ayrıca nightly rust'a ihtiyacımız var. Yüklemek için Rust kurulumu ile gelen rustup komutundan faydalanıyoruz.

```
rustup toolchain install nightly
```

Artık her şey hazır. cargo expand komutunu çalıştırdığımızda 3 satırlık main fonksiyonunun aslında çok daha karmaşık bir Rust koduna derlendiğini görüyoruz.

```rust
fn main() {
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["Hello, world!\n"],
            &match () {
                () => [],
            },
        ));
    };
}
```

println! içine format string vererek olayı biraz daha karmaşık hale getirelim.

```rust
fn main() {
    let name = "Fehmi Can Saglam";
    println!("Hello, {}!", name);
}
```

Yine cargo expand ile oluşturulan Rust koduna bakalım.

```rust
fn main() {
    let name = "Fehmi Can Saglam";
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["Hello, ", "!\n"],
            &match (&name,) {
                (arg0,) => [::core::fmt::ArgumentV1::new(
                    arg0,
                    ::core::fmt::Display::fmt,
                )],
            },
        ));
    };
}
```

Oluşan bu karmaşık kodları kendimiz yazmamak için *println!*'in bize bağırmasına katlanmak zorundayız🙂 Yarın görüşmek üzere👋

