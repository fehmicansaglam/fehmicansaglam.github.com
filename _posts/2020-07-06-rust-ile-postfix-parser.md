---
title: "Rust ile basit postfix parser"
description: ""
category: rust
---
[Reverse Polish notation(RPN)](https://en.wikipedia.org/wiki/Reverse_Polish_notation) veya diğer adıyla postfix notation hesap makinalarında çokça kullanılan bir ifade biçimi. Hepimizin aşina oldugu infix notasyonunda işlem işlenenden önce gelir. Örnegin *3 + 4* ifadesi infix biçimdedir. Postfix notasyonunda ise işlem işlenenden sonra gelir. Aynı ifade postfix notasyonunda *3 4 +* biçiminde yazılır. Postfix notasyonun en güzel tarafı parantezlere ihtiyaç duymamasıdır. *3 * (4 + 8) / (6 - 2)* gibi karmaşık bir infix ifadesi postfix notasyonunda *3 4 8 + * 6 2 - /* şekline dönüşür.

Bu yazıda basit bir postfix ifade parser yazmaya çalışacağım. İfadeler bize infix notasyonda geliyorsa elbette önce postfix notasyona dönüşüm gerekir. Ama ben işi basit tutmak adına bu adımı atlıyorum. Hatta ifadenin string olarak değil de işlem(operation) ve işlenen(operand) şeklinde tokenlarına ayrılmış olarak elimizde oldugunu varsayıyorum. Böylece işin özündeki veri yapılarına odaklanabileceğiz.

Yukarıda söz ettiğim gibi postfix notasyonda iki çeşit token var. Biri yapılacak işlemi belirten operator, diğeri de üzerinde işlem yapılan sayı yani operand. Yalnızca 4 işlemi destekleyen hesap makinamızda 4 çeşit operator var ve bunları bir enum ile ifade edebiliriz.

```rust
enum Operator {
    Add, // +
    Sub, // -
    Mul, // *
    Div, // /
}
```

Operand ve operator tokenlarını da yine bir enum içinde ifade edebiliriz. Böylece operator ve operand aynı türün farklı örnekleri gibi davranacaklar. Bunu bir tür inheritance gibi de düşünebiliriz.

```rust
enum Token {
  Op(Operator),
  Operand(i32) // Hesap makinamız yalnızca tamsayıları destekliyor.
}
```

Bu şekilde yapınca bir token dizisine hem operator hem de operandları koymamız mümkün oluyor.

```rust
use Token::*;
use Operator::*;
// 3 4 8 + * 6 2 - /
let tokens = [
    Operand(3),
    Operand(4),
    Operand(8),
    Op(Add),
    Op(Mul),
    Operand(6),
    Operand(2),
    Op(Sub),
    Op(Div),
];
```

Artık elimizde tokenlarımız olduğuna göre bir stack yardımıyla bu tokenları işleyip ifadenin sonucunu bulabiliriz. Rust dokümantasyonuna göre [Vector](https://doc.rust-lang.org/std/collections/index.html#use-a-vec-when) veri yapısı birçok iş için ideal ve stack de bunlardan biri.

```rust
let mut stack = Vec::new();
```

Algoritmamız gayet basit. Tokenlarımızı soldan sağa işlerken eğer bir operanda denk gelirsek bunu stack'e iteceğiz. Operator geldiğinde stack'ten iki operand çekip operatorün belirttiği işlemi yaptıktan sonra tekrar stack'e iteceğiz. Tüm tokenlar bittiğinde stack'te kalan son sayı da tüm ifadenin sonucu olacak.

```rust
for token in tokens.iter() {
    match token {
        Operand(number) => {
            stack.push(*number)
        }
        Op(operator) => {
            let right = stack.pop().expect("Sağ operand bulunamadı!");
            let left = stack.pop().expect("Sol operand bulunamadı!");
            match operator {
                Add => stack.push(left + right),
                Sub => stack.push(left - right),
                Mul => stack.push(left * right),
                Div => stack.push(left / right),
            }
        }
    }
};

println!("Sonuç: {}", stack.pop().unwrap());
```

*stack.pop()* eğer stack boş ise bir token dönemeyeceği için Option tipinde bir değer dönüyor. Birçok programlama dilinde mevcut olan bu tipten başka bir yazıda bahsedeyim. Uygulamamıza gönderilen ifade geçersiz bir ifade ise stack'ten operand çekmeye çaliştığımızda None elde edeceğiz. None durumu için özel bir işlem yapmaktansa uygulamanın hata verip çıkmasını tercih ettim. Bu amaçla *expect* metodunu kullanıp daha düzgün bir hata mesajı vermeye çalıştım.

Yarın başka bir konu ile görüşmek üzere👋


