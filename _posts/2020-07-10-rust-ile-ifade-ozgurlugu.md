---
title: "Rust ile ifade özgürlüğü"
description: ""
category: rust
---
Scala'da her şey bir expression(ifade). Bunun faydalarını gördükten sonra yalnızca statement'lar ile çalışan diller beni çok zorlamaya başladı. Örneğin Java yazarken bu durumdan oldukça rahatsızım. Expression bir değer üretir ve dönerken, statement aslında bir tür durum veya emir belirtir. Dolayısıyla statement'lar imperative dillerin, expression'lar da fonksiyonel dillerin temel bileşenleridir. Expression ve statement farkını örneklerle anlatmaya çalışayım.

Rust'ta fonksiyonun veye bir bloğun son satırındaki ifade fonksiyonun dönüş değeridir. Bu nedenle return yazmanıza gerek yoktur.

```rust
fn square(a: i32) -> i32 {
    a * a
}
```

İfadeleri `b = a * a` şeklinde bir değişkene atayabiliriz. Aynı şeyi Rust'ta if/else ile de yapabiliriz.

```rust
let result = if factor >= 0.0 {
    score * factor
} else {
    score / factor
};
```

Verdiğim örnekte result değişkeni immutable ve factor parametresine göre farklı bir değere sahip olması gerekiyor. Bunu bir statement ile yapmaya çalışsaydık değişkeni her durum için tekrarlamamız gerekecekti.

```rust
let result;
if factor >= 0.0 {
    result = score * factor
} else {
    result = score / factor
}
```

Benzer şekilde if/else ifadesini fonksiyonun dönüş değeri olarak da kullanabiliriz.

```rust
fn apply_factor(score: f64, factor: f64) -> f64 {
    if factor >= 0.0 {
        score * factor
    } else {
        score / factor
    }
}
```

Rust'ta pattern matching de bir ifade ve match sonucu immutable bir değişkene atanabilir.

```rust
let user_name = match get_user(id) {
    Ok(user) => Ok(user.name),
    Err(e) => Err(e)
};
```

Benzer şekilde match ifadesi bir bloğun veya fonksiyonun dönüş değeri olabilir.

```rust
fn get_user_name(id: i32) -> Result<String, String> {
    match get_user(id) {
        Ok(user) => Ok(user.name),
        Err(e) => Err(e)
    }
}
```

Bir dil statement'lardan oluşuyorsa o dilde mutability ve side effect'ler var demektir. Oysa biz hatasız uygulamalar yazmak için bunlardan kaçınıyoruz. Rust expressionlar ile kod yazmamıza imkan veriyor. Bu yüzden hatasız uygulamaları ifade özgürlüğümüz var. Yarın başka bir konu ile görüşmek üzere👋


