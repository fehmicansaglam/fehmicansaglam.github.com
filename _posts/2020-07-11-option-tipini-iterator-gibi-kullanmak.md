---
title: "Option tipini iterator gibi kullanmak"
description: ""
category: rust
---
Daha önce Option tipinden ve özellikle null referans hatasına karşı bizi nasıl koruduğundan bahsetmiştim. Bugün de Option tipini 0 veya 1 elemanlı bir liste gibi düşünüp diğer koleksiyon tipleriyle nasıl birleştirebileceğimize değinmek istiyorum.

Konumuza geçmeden önce bu paragrafta başka bir konudan bahsetmek istiyorum. Takip ettiğiniz üzere sekiz gündür Rust hakkında bir şeyler karalıyorum. Şu anda da dokuzuncu yazıyı yazıyorum ve Türkçe yazdığım teknik yazılarda terimleri yazarken çok zorlanıyorum. Örneğin ilk paragrafta beni zorlayan terimler type, list, iterator, collection ve composition oldu. Bu konunun birçok yerde tartışıldığını biliyorum ancak ortada benim bildiğim kadarıyla bir sonuç yok. Diğer yandan bu yazıyı İngilizce de yazabilirim ama bu bana Türkçe yazmak kadar keyif vermiyor. Çünkü yazılı ifade benim için bir tür oyun. Ana dilimde aynı şeyi farklı şekillerde ifade etmeye çalışmak, kelime tekrarı olmadan cümleler kurmak, yazım kurallarına göz ucuyla yeniden bakmak bence çok zevkli. İtiraf etmem gerekirse "ana dili" ayrı mı yoksa bitişik mi yazılır diye bir baktım ve Nazım Hikmet'in şu güzel cümlesiyle karşılaştım: "*İnsan tehlike karşısında ancak ana diliyle feryat edebiliyor*". Elbette işin bir de okuyucu kısmı var. Ben yaş itibariyle İngilizce eğitimin görece çok daha kaliteli olduğu bir dönemde yetiştim. Fakat son dönemde yetişen nesil takip edebildiğim kadarıyla bu konuda şanssız. Bana iterator ya da collection terimleri çok doğal gelirken herkeste aynı algı var mı bilemiyorum. İşin doğrusu bu konudaki yorumlarınızı beklemiyorum🙂 Yalnızca bir durumu bir sıkıntımı ifade etmek istedim. Amacım bu konuda bir tartışma başlatmak değil.

Şimdi konumuza [iterator](https://doc.rust-lang.org/std/iter/index.html) ile dönüyorum. Elimizde bir tür koleksiyon varsa ve koleksiyonun elemanları üzerinde işlem yapmak istiyorsak karşımıza iterator çıkıyor. Rust'ta belki en sık kullanılan koleksiyon tipi olan vektör ile bir örnek vereyim.

```rust
let vec = vec![0, 1, 2, 3];

for v in vec.iter() {
    println!("{}", v);
}
```

Option tipi de aslına bakarsak None veya Some olma durumuna göre 0 veya 1 elemanlı bir koleksiyon. Bu yüzden yukarıdaki kodu hemen hemen aynı şekilde Option tipinde bir değer ile de yazabiliriz.

```rust
let maybe_name = Some("Fehmi Can Saglam");

for v in maybe_name.iter() {
    println!("{}", v);
}
```

Mevcut haliyle bu döngü yalnızca 1 kez çalışıyor. maybe_name değişkeni None olsaydı bu döngü hiç çalışmayacaktı. Madem ki Option tipinden bir iterator elde edebiliyoruz, diğer koleksiyon tipleri ile birlikte nasıl kullanabiliriz bir bakalım. İlk vereceğim örnek bir vektör ile option'ı zip metodu ile birleştirmek olacak.

```rust
let maybe_name = Some("Fehmi Can Saglam");
let vec = vec![0, 1, 2, 3];

for v in maybe_name.iter().zip(vec.iter()) {
    println!("{:?}", v);
}

// Çıktı
// ("Fehmi Can Saglam", 0)
```

Her ne kadar vectör içinde 4 eleman olsa da diğer iterator 1 elemanlı olduğu için zip metodu 1 elemanlı bir iterator üretti. Şimdi de *chain* metodu ile bir vektör ve bir option'ı uç uca bağlayalım.

```rust
let vec = vec![0, 1, 2, 3];
let maybe_value = Some(42);

for v in vec.iter().chain(maybe_value.iter()) {
    println!("{}", v);
}

// Çıktı
// 0
// 1
// 2
// 3
// 42
```

Bu örnekte *maybe_value* değeri *None* olsaydı yalnızca ilk vektör üzerinde dönmüş olacaktık. Böylece yazılımda soyutlamanın önümüzde ne gibi imkanlar açabildiğini görmüş olduk. Yarın başka bir konu ile görüşmek üzere👋





