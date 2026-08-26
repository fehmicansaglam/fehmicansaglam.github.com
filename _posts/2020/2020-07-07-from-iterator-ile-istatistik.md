---
title: "FromIterator ile istatistik üretmek"
description: ""
category: rust
---
[FromIterator](https://doc.rust-lang.org/std/iter/trait.FromIterator.html) bir iterator'dan kendi tanımladığımız bir tipin nasıl üretilebileceğini belirtiyor. Kendi tanımladığımız tip için bir kısıtlama yok. Dokümantasyonda bir vektörü sarmalayan *MyCollection* isminde bir struct örneği verilmiş. Doğrudan collection içermeyen bir örnek bana daha ilgi çekici geldi ve collection istatistiklerini tutan bir tip yazmak istedim.

```rust
#[derive(Debug)]
struct Stats {
    count: i32,
    sum: i32,
    avg: f32,
}
```

Tamsayılar içeren bir collection hakkında eleman sayısı, toplam ve ortalama gibi basit istatistikler tutan veri yapısını yukarıdaki gibi tanımladım. *#[derive(Debug)]* satırı ile compiler bizim için Debug traitini gerçekliyor ve println! ile ayrıntılı çıktı basabilmemizi sağlıyor.

Şimdi de Stats tipi için FromIterator traitini implement edelim. Basitçe iterator üzerinde dolaşacağız ve istatistikleri üretip Stats içinde döneceğiz.

```rust
impl FromIterator<i32> for Stats {
    fn from_iter<I: IntoIterator<Item=i32>>(iter: I) -> Self {
        let mut count = 0;
        let mut sum = 0;
        for val in iter {
            count += 1;
            sum += val;
        }
        Stats{
            count,
            sum,
            avg: sum as f32/ count as f32,
        }
    }
}
```

Artık bir tamsayı listesinden Stats nesnesine dönüşüm yapabiliriz. Aşağıdaki örnek 1 ve 4 kapalı aralığındaki sayılar için istatistik hesaplıyor.

```rust
let stats: Stats = (1..=4).into_iter().collect();
println!("{:?}", stats)
```

Debug traiti bizim için implement edildiğinden println! çıktısı epeyce ayrıntılı oluyor.

```
Stats { count: 4, sum: 10, avg: 2.5 }
```

Yarın başka bir konu ile görüşmek üzere👋
