kotoli = { "jaa": "alu", # afto na her grun un vil du deki se katai kotoba jam na ljeva (na vscode)
"un": "toi",
"du": "van",
"sor": "hon",
"vi": "vir",
"dok": "vani",
"hei": "honi",
"glossa": "aha",
"paszun": "minen",
"ara": "i",
"nil": "zero",
"en": "un",
"ni": "dau",
"tre": "tri",
"kjer": "pedua",
"go": "pun",
"eksi": "hue",
"nana": "saiti",
"kasi": "viti",
"nyn": "nau",
"den": "de",
"danke": "razi",
# "ka": "part", # afto gammel
"ka": "kue",
"ak": "ya",
"nai": "kon",
"fsto": "daku",
"varge": "kule",
"ros": "rui",
"portu": "pur",
"kiro": "robo",
"midori": "rusu",
"blau": "azuri",
"roza": "rosa",
"murasaki": "viola",
"romura": "meya",
"brun": "goto",
"kuro": "ku",
"sziro": "bulan",
"gris": "kubulan",
"s": "ce",
"bra": "bon",
"warui": "malu",
"kondor": "kente",
"au": "i",
"hund": "koipe",
"kot": "niako",
"deki": "iso",
"vil": "naku",
"har": "yo",
"gelt": "robu",
"pravda": "dun",
"uso": "sai",
"men": "taso",
"dua": "gusata",
"banan": "palisa",
"kotoba": "pakala",
"per": "para",
"porto": "gan",
"apar": "siau",
"mange": "puku",
"ringo": "yabuko",
"skoi": "pisopoko",
"sziru": "komo",
"iske": "gogo",
"namting": "makan",
"nam": "nonki",
"sama": "sama",
"lik": "li",
"czigau": "kente",
"nju": "giu",
"sakana": "hutu",
"hoz": "zerdo",
"baum": "abere",
"dasos": "forete",
"afto": "ni",
"tuo": "ni", # jam mono ni
"asoko": "na",
"ljeva": "kiri",
"migi": "kanan",
"oba": "atasa",
"una": "pava",
"al": "tuda",
"joku": "alucun",
"jam": "teme",
"mies": "au",
"onna": "uru",
"gammel": "odin",
"neo": "gaditi",
"dan": "var",
"ima": "nu",
"mirai": "liri",
"100": "66", # mus 66 grun 666 PERKELE lasku 100
"ine": "sa",
"baksu": "kanten",
"plas": "pore",
"os": "edo",
"kafe": "kohen",
"vapa": "panasu",
"samui": "puriyo",
"hanu": "aha", # sama na glossa
"kola": "lapi",
"mora": "morasa",
"dag": "noku",
"gvel": "afen",
"nakt": "malan",
"stol": "seri",
"glug": "nomki",
"stur": "maha",
"czisai": "lili",

}

# kjannos-ilo viossa kara minemiaha made
# mahajena na sq

# da se: https://vikoli.org/Minemiaha
# au https://vikoli.org/Viossa
# na wikipedia: https://en.wikipedia.org/wiki/Viossa

# gomen li afto kompjuossa lesekinai jo 😭😭
# maha un afto lik na 3:00
# awen, un bruk [mitzam][silbazam] grun un dua tokiponossa au nihonossa :D

# per kjannos
while True:
  hanufras = input("viossa: ")
  # li tasta OWARI sit "vras" ilo
  if hanufras == "OWARI":
    print("sajo!")
    break
  
  kotobara = hanufras.split()
  neo = []
  for kotoba in kotobara:
    ceki = kotoba.strip(".,!?")
    pik = kotoba[len(ceki):]
    ceki = ceki.lower()
    if ceki in kotoli:
      neoko = kotoli[ceki] + pik
    else:
      neoko = f"[{ceki}]" + pik # un szirunai jo 😭 ka ,.?!@#$%^&*()_+-=[]{}\|;:'"<>/`~
    neo.append(neoko)

  print("minemiaha: "+" ".join(neo))

# :3 owo minemiaha