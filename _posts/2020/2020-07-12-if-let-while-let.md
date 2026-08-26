---
title: "if/let ve while/let ile türlü oyunlar"
description: ""
category: rust
---
Bazı durumlarda *pattern matching* gereğinden fazla karmaşık olabiliyor ve bu durumları `if let` veya `while let` ile basitleştirebiliyoruz. Her zaman olduğu gibi buraya dokümantasyonu kopyalamaktansa kendimce ilginç bulduğum bir örneği paylaşacağım. Yine de bu iki kullanımı hatırlamak adına önce kısa kod örnekleri vereyim.

```rust
let number = Some(42);

if let Some(42) = number {
    println!("Etli ekmek değil, hayatın anlamı!");
}
```

Yukarıdaki kod parçasında *number* değeri yalnızca 42 olduğunda bir iş yapmak istiyoruz. Pattern matching kullandığımızda tüm durumları ele almamız zorunlu olduğundan bu kod gereksiz yere aşağıdaki gibi uzayacaktı.

```rust
let number = Some(42);

match number {
    Some(42) => println!("Etli ekmek değil, hayatın anlamı!"),
    _ => {}
}
```

`while let` ile de benzer bir örnek vereyim. 10'dan geriye doğru sayıp 0'a ulaşınca duran bir döngü yazalım.

```rust
let mut optional = Some(10);

while let Some(i) = optional {
    if i == 0 {
        optional = None;
    } else {
        println!("{}", i);
        optional = Some(i - 1);
    }
}
```

Yukarıdaki örnekten hareketle geri sayan bir [iterator](https://doc.rust-lang.org/std/iter/index.html) yazmak ve bunu *while let* ile kullanmak istiyorum. Iterator aslında *next* isminde bir metod içeren bir trait. Bu metod bir sonraki eleman mevcutsa Some, değilse None dönüyor.

Önce state tutmak için Counter isminde bir struct tanımlayalım.

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new(count: u32) -> Counter {
        Counter { count }
    }
}
```

Şimdi de bu struct için iterator traitini gerçekleyelim. Her next çağrısında count değerini kontrol edeceğiz. *count* 0 ise None dönerek iterator içinde daha fazla eleman kalmadığını belirteceğiz. *count* 0 değilse 1 azaltıp mevcut değeri Some ile döneceğiz.

```rust
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        let curr = self.count;
        if curr == 0 {
            None
        } else {
            self.count -= 1;
            Some(curr)
        }
    }
}
```

Sıra gerçeklediğimiz bu iteratorü *while let* ile kullanmaya geldi.

```rust
let mut counter = Counter::new(5);

while let Some(val) = counter.next() {
    println!("{}", val)
}

// Çıktı
// 5
// 4
// 3
// 2
// 1
```

Aslında *counter* artık iterator olduğu için while let kullanmamıza gerek yok. Kullanımı gösterebilmek ve de Rust özellikleriyle biraz oynamak amacıyla böyle bir örnek verdim. Yukarıdaki kodu şöyle de yazabiliriz.

```rust
let counter = Counter::new(5);

for val in counter {
    println!("{}", val)
}
```

Dürüst olmak gerekirse *for* kullandığımızda *counter*'ın neden mutable olmasına gerek kalmadığını henüz anlayamadım. Çünkü counter değişkeninin state'i üzerinde dönerken yine değişiyor. İlerleyen günlerde bunun nedenini anlarsam paylaşırım. Yarın başka bir konu ile görüşmek üzere👋



