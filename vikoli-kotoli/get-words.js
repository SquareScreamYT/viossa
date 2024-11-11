function parseWikiTables(wikiText) {
  const tables = wikiText.match(/{.*?class="wikitable".*?\|\}/gs);
  if (!tables) return "[]";
  
  let result = [];
  
  tables.forEach(table => {
    const rows = table.split('|-')
      .filter(row => row.includes('||'));
      
    rows.forEach(row => {
      const cells = row.split('||')
        .map(cell => cell
          .replace(/[\|\{\}]/g, '')
          .replace(/\[\[.*?\]\]/g, '')
          .replace(/<span.*?<\/span>/g, '')
          .replace(/…/g, '')
          .replace(/\[|\]/g, '') 
          .trim())
        .filter(Boolean);
        
      if (cells.length >= 3 && !cells[0].startsWith('!')) {
        const word = cells[0];
        const altForm = cells[1];
        const definition = cells[2];
        const category = cells[3] || '';
        
        if (word) {
          result.push({
            [word]: {
              category: [category],
              definition: `${altForm ? altForm+"<br><br>" : ""}${definition}`
            }
          });
        }
      }
    });
  });
  
  return JSON.stringify(result, null, 2);
}

//update with https://vikoli.org/index.php?title=Kotobalibre&action=edit 
const wikiText = `
__NOTOC__
''Kotoli mitrjo mahaena''

&nbsp;&nbsp;

<div class="toccolours mw-collapsible mw-collapsed" style="margin:auto; overflow:auto;">
<div style="line-height:1.6;">  Bruk hur pas afta kotoli </div>
<div class="mw-collapsible-content">

;All kotaba ine afta kotoli ine parjan e, fu Vjosaalfakun. Ds. l. 8 pr alfakun. Ttb:

: magazin…
: maha…
: mahaklar…
: majkrafon…
: maladec…

;Li kotaba gen ine mahaklarsma, sit jam risanen <code>~</code> djabdell afta, ttb:
: alfakun… Anglosa∼. ∼ fu Vjosa.
: da lesa:
: alfakun… Anglosaalfakun. Alfakun fu Vjosa.

;Li kavare kotaba sebjaimi akote catajn kotaba, sit jam risanen ␇ ejns afta, ttb:
: rz… ␇ rz za rz Na moge rz…

;Li jam ataj imi fu kotaba, sit jam lasku ejns afta, ttb:
: avto… 1. Ugokuting mit krajs, skoj ke. 2. Mikava ugokuting…

;Li jam plusejn tropas pr mahaklar ejn imi, sit jam risanen ; melan afta, ttb:
: ataj… Lasku, numbra fu jt; hur moge…

;Li jam qigau kotaba mit sama kava, sit jam lasku ejns afta, ttb:
: sjot1… Santlik qisaj sira isi ke brukena pr naze sjot smak na joku namting made.…
: sjot2… Harena bra smak lik fraut…
: sjot3… Tell fu netopa fu vonating, andere vonating no ke…

;Li kavare nojtajena kotaba, sit jam kavarisma za afta, ttb:
: no, nam…
: da hanu a kaku:
: No wo rega; namting; nahtnam.

;Li bli tolka e i, sit se tolka i, ttb:
: ajoge, i…
: da kaku:
: Ajog'''e''' pasun; Ajog'''i'''kot.

;Li kavarisma moge qigau kotaba, sit jam rjoha kotabanen sebja ttb:
: pasun | djin…
: djin | pasun

;Jam kakunen za kotaba, hanu ke cuj kotabafall fu afta kotaba: tko, lko, sko, trko, pko, prko, mko, tlko, hadjiko, avariko, os krajsko (ds. hobitkotaba una). Ttb:
: pasun… tko…

;Li hanu kotaba tolka cuj catajn kotaba, os nojta snana afta mit catajn kotaba, sit jam kakunen ine (), ttb:
: '''bidra…''' (jt mit jd)…
: da hanu a kaku:
: Bidra wo '''denva mit sebja'''

: '''duwa…''' (tj)…
: da hanu a kaku:
: Duwa wo nea '''vove''' fun.

: '''zaju…''' (jd)…
: da hanu a kaku:
: Zaju moge wo '''dk.'''

;Jam tatoeba fu brukena za all kotaba pr fﬆo plusbra imi fu afta, pr fﬆo, bruk hur afta ine fras, ttb:
: acar… Aldjin har ∼. Rju ∼lik. Mogedjin ∼ grun un.


* Hir jam moge kotaba kakujena mit Kerosa gavor grun afto kotabalibre har al kotaba Kotabalibre mahaena per Ker har. Dankedajdajdajdaj na '''Kerdjin'''❤️  per vi lake bruk Kotabalibre fu sore hir! Dase mahazma fu Ker au plus teksti mit siruzma tsui Kotoli fu Ker ine afta [https://old.reddit.com/r/conlangs/comments/xvyrjt/a_viossa_dictionary/ zedvera Reddit made]. 

* '''Dabitte reforma au/os nazi neokotaba ine afta kotoli!''' Kakutropas fu neokotaba au samaimiko har naj ruru. Al kakutropas bra est. Li du siru kotaba ke hir jamnai, bitte nazi sore awn li du sirunaj imi fu sore! Ttb.: Neokotaba utn imi deki nazi mit <code> | neokotaba hir||  || || </code>. Au mit imi du deki nazi lik <code> | neokotaba||  || ||  dakaku imi au/os ttb fu sore ine hir </code>. 



Hobitkotaba ine afta kotabalibre: 

* avariko - avarikotaba
* ds. - da se
* glos. - akote glosasiru
* hadjiko - hadjikotaba
* hobitko - hobitkotaba
* jd - jokudjin
* jl - jokulik
* jp - jokuplas
* jt - jokuting
* k. - kodr
* krajsko - krajskotaba
* l. - lehte/lik
* lko - likkotaba
* mitko - mitkotaba
* os a. - os andere
* pko - paskotaba
* prko - prkotaba
* s. - sama
* sko - surukotaba
* tko - tingkotaba
* tlko - telkotaba
* trko - tropaskotaba
* ttb. - tatoeba

</div></div>
----

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== 0-9/A ====

{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| 100 || || || zan "hyaku" aparlik "haha" 
|-
| a||  || mitko|| S. au.
|-
| [[kotobanen#-a|-a]] || || || 1. Naşeņa na tingko sama "fu (tingko)" 2. Wodoxossa Kara: Ni ting. Ejn kot, ni kota
|-
| abad||  || tko|| Joku plas, doka jt deke e. nil abad=pic, ein abad=sen, ni abad=ceric tre abad=sewas. 
|-
| abece||  || tko|| S. alfakun. 
|-
| absalutna||  || trko|| S. tabun.
|-
| abura||  || tko|| Glugting mahajena na solblume, asetona auauau.
|-
| acar|| acor|| tko|| Kokara, sit ke pasun srej, sjan iten ugoku, au bli plussirakozalik. Aldjin har ∼. Rju ∼lik. Mogedjin ∼ grun un. 
|-
| acor|| = acar|| ||
|-
| afe||  || tko|| Njuantaena djinlik djor.
|-
| [[afto|afta]] || afto || pko|| 1. Hanu cuj jt akote, os jt, ke hanuena dannen. 2. Brukena pr ﬆrela na jt made. O dua ∼ klea. ∼ kotoli fun. ∼ avto bra. Dok pravda dua ∼ tufel? Ti bra, li pasun plusfuva. O vill, ke ∼ sluca. O zaju sore. Ka zaju? ∼ neako fun. Ka du mjeta cuj ∼? Danaj suru ∼!
|-
| aftrukyen|| || || li du glug mange kirkas sit du bli ~ 
|-
| ahare||  || lko (cuj jt)|| Harena nilting ine; k. sat. ∼krajs. ∼ baksu. Klinje fun ∼. 
|-
| ainlat|| || || 
|-
| aja||  || sko|| Skoj ine avto. O ∼ naergaplasmade. 
|-
| ajoge|| i|| sko|| Skoj bides iske. O naj dekk ∼. Iskeavto ∼ bides afta mare. 
|-
| ajsa||  || sko (jt)|| 1. Fﬆo krajsena velt mit me, korva, hana, glosa, hant, au andere tropas. 2. Har joku kokara akote zdorva. O ∼ varuj njoj. Vava lera mit ∼ena alting inekrajs fu sore. Li pas zdorvanaj, sit sore ∼ varuj. 
|-
| ajsta|| katana|| tko|| Brukting pr cer. Cer banan mit ∼. Jam 3 ∼ inn kuhnja fun. 
|-
| ak|| = akurat|| ||
|-
| [[netopa|akama]] || atama, ataama|| tko|| Tell fu djinnetopa long all andere tell. Pasun bruk ∼ fsore pr mjeta, ajsa, au trak pipa. 
|-
| akote||  || prko|| 1. Moge para; k. prara. 2. Cuj. 3. Lik. O erga ine skola ∼ vove fun. Dok mjeta ka ∼ afta? O lera ∼ laskusiru. Joku kotaba, ke par sama os lik imi dan, ima tua moge qigau, hata ∼ imi. [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| [[Akkurat (kotoba)|akrat]] || akkurat, akku, akk || tlko|| Svar fu uslova; k. naj. Dua we Vjosa? ∼!
|-
| al…||  || hadjiko|| Ds. all1 . ∼djin. ∼ting. ∼tid. ∼plas.
|-
| alfakun||  || tko|| All kirajn fu joku kakutropas os glosa ine joku parjan. Anglosa∼. ∼ fu Vjosa. 
|-
| all1 || al|| lko|| Hell, naj dekiena ra; k. nill1 . O erga ∼ dag. Afta kotoli har ∼ kotaba, ke o siru.
|-
| all2 || al|| tko|| Alting. Dok lakk ra ∼! amlet, tko. Namting, ke gatovena fu viskaena jajco au nju kara.
|-
| aman|| ahman, haman|| tko|| hanu ka du mieta, men nai širu li prafda os nai. Hmm.. A, B, C, os D? Svar je C, un ahkman. mahse beze kokoro. 
|-
| an- || || || "suru made" sama "ansuru"
|-
| [[Kotobanen#-anża/-anža|-anza]] || || || Seeņa, xuureņa, os ikenna na tak, nai hel tsatain.
|-
| ar- || || || "suru kara" sama "arsuru"
|-
| [[kotobanen#-ara|-ara]] ||  || || mange. ttb. pashara. Wodoxossa Kara: Tri os plu ting. Ejn kot, ni kota, tri/kjere/go (auau) kotara
|-
| andere|| ander, andr || lko|| Qigau; naj sama; plus. Naj jam ∼ tropas fu suruafta. Naj treng ∼ glosa qigau Vjosa.
|-
| anta||  || sko (jt na jd made)|| Ugoku na andere hant made; k. sada. O ∼ gavat na mik fun made na sintuadah fsore. Mjes inn Rusilant mus ∼ ejn tosi na kriglerasma made. Seena tk moge helena onanetopa au onakava ine Reddit ∼ tristsma na un made.
|-
| anunza||  || sko|| Hanu bragetalik. ∼ jevaltdjin na danuk.
|-
| apar1 ||  || lko|| Fu qisaj ataj; naj more. ∼ rega brukena pr apeta neadjin pr Vjosa.
|-
| apar2 ||  || trko|| Na apar tid; naj moge; naj djiongena; s. cutcutt. Erga fun ∼ haste. Dk ∼ pinona perun. Vjosa ∼ kavare, de o gentula.
|-
| [[kotobanen#al-,_apar-,_ma-,_takk-|-apar]] || || || imi sebja
|-
| apeta|| opeta || sko (jd)|| Anta sirusma os dekisma na sore made; apu sore lera. apeta sebja, s. lera. ∼ neadjin. ∼djin sada apar gelt erga fsore kara. Li pas vil lera Vjosa, jam inn Vjosadiskordserver moge pasun, ke vill ∼ pas. 
|-
| apcas||  || tko|| 
|-
| apu1 ||  || sko (jd)|| Anta bra surusma na sore made. Vjosadjin ∼ neadjin pr lera glosa. O glug kirkas, hata o fsto, ke tua naj ∼ un pr plusbra kokara.
|-
| apu2 ||  || tko|| S. apusma. O mjeta ke zamisalidjin maha moge nea ko dan iten ∼ fu demisalidjin. O treng plusmoge ∼ pr mahaklar kotaba.
|-
| ad || ad- || || Sama ktoba "made". Paš škej ar B, ad A = Pash skej B kara A made. 
|-
| ar || ar- || || Sama ktoba "kara". Arsaadaun ringo du. Paš škej ar B, ad A. 
|-
| arka||  || sko|| Har djiong varuj ajsa ine netopatell grun cer, slag, auauau. Jube fun ∼ 
|-
| asa||  || sko|| Naj kola; jamete kola. Na afta naht o kola varuj, au ima haste ∼ perun. 15 fun fu kolasma apu pas ∼ na 1 djikan. ∼ na mora, srej radi bra kokara, sada hanasu. 
|-
| asme|| i|| tko|| Kokara sadaena fu all slucasma au ting inekrajs fu jd kara. Fuwafuwa ∼. Baja ∼. Eena inn Vjosadiskordserver anta na un made tk bra ∼ 
|-
| asoka||  || pko|| Akote jt os jd, ke moge prara rjoha hanasudjin, ine plas os na tid. Huske we ∼ pasun inn librehuomi?
|-
| asor||  || lko (cuj jd os djinklane)|| Harena moge gelt; k. ven. ∼ pasun. Jevaltdjin fu lant moge ∼ snana. Amerikalant lecte∼ lant ine velt. 
|-
| ataj||  || tko|| Lasku, numbra fu jt; hur moge. Stor ∼. ∼ fu rega. ∼ fu kotaba nana ine afta fras. 
|-
| [[kotobanen#-atai|-ataj]] || -atai || || Lasku os atai fu jokuting, kawari suruko os likko osos tingko made
|-
| atama…||  || hadjiko|| 1. Ds. akama. 2. S. jevalt. ∼djin.
|-
| atekse||  || tko|| Qisaj samujvonarosena djor mit pitka netopa, pitka rofaj, au isilik koza. Kavaj ∼.
|-
| atona|| otona  || tko|| Pasun za lapse. ∼ har hisfull plusmoge lapse. All lapse vill bli ∼. Viha eena ∼.
|-
| au||  || mitko|| Brukena pr feﬆa fraﬆell. Jaa ∼ bratulasta na hir made! O han Rusiona, Anglosa, Dojcosa, ∼ Vjosa. O ∼ mik fun skoj na magazin made. 
|-
| auauau||  || tlko|| 1. Brukena pr hanu cuj plusejn ting, ke lik os sama ting ine hina fu afta. 2. Gen au gen mit sama parjan. Jam moge tropas fu ugoku: jalaka, skoj, jingsaj, avto, ∼. Hata Pollskosa, Ukrainosa, ∼ moge lik Rusiosa, o moge varuj fsto tua akote jokugrun. Ejn, ni, tre, kere, ∼.
|-
| auke|| i|| sko (jt)|| Suru, ke dekk ugoku bides afta; k. kine. Da ∼ me fdk. ∼ena dvera.
|-
| avara||  || tko|| Plas eksa Gaja; ahare kura plas. Gagarin ejns pasun e, ke lleta na ∼ made.
|-
| avare1|| owari, ovari, i|| sko|| Jamete e; ende naj e; k. hadji. Erga fu Sizif na niltid ∼. All bra, ke ∼ bra. 
|-
| avare2 || i|| sko (jk)|| Naj suru ende; k. hadji. Da ∼ suru baka, da skoj! 
|-
| avare3 || i|| tko|| Plas os tid, doka jt avare; k. hadji. Jam pik ine ∼ fu all fras. ∼ fu velt acorlik sluca. 
|-
| avariko || avarikotoba || tko || 
|-
| avarisi||  || tko|| Isi avara kara, spar ke oba Gaja. 
|-
| avn1|| awen, aven|| trko|| Au. O zaju du. O ∼ zaju du. Li pas suru moge, pas ∼ no moge. Brakolasta! Du ∼sta. 
|-
| avn2 ||  || tlko|| Brukena pr hadji nea hanasutell, ke feﬆaena mit dehanasutell; plus. Vi ende tk moge erga dan, zoll avare. ∼, o moge mjude.
|-
| avto||  || tko|| 1. Ugokuting mit krajs, ke skoj. 2. Mikava ugokuting. O skoj na skola made mit ∼ fun. Iske∼. Luft∼. 
|}


pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== B ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ba- || || || mit warùj mjépie. ~kotoba sama kusipäako. Suru cetaj na uaruj/bjoze/kuşipa tropos. Vil suru uaruj andrżin made.
|-
| baba||  || tko|| Qisaj midore samujvonarosena djor mit pitka glosa, ke pall pitka.
|-
| badji||  || tko|| Kaban pr harena iskelik. Naze dk bidra ∼? Jam iske hir. 
|-
| baj||  || sko (jd)|| Suru, hanu radi andere pasun suru jt. O ∼ mik fun pr sorr lesa afta kotoli.
|-
| baja||  || lko|| Harena acorena, zeusena, kjomuskeena asme; atśoréna koske nai širu li bli vraséna os nai. baja koske nai širu li jing iskát os nai. k. pampe. ∼ pasun. O tk ∼ na dk made! 
|-
| baka||  || lko (cuj jd)|| Naj dekiena svinur, pravda, bra mjeta; l. hambak; k. svinur. Dk ∼. ∼djin. Aldjin ∼, koske sorr lera. 
|-
| baksu||  || tko|| Ahare kerejlik ting, ke mahaena fu paksu papere kara, au ke pr kjomuske os ugoku ting. Stor ∼. Torta tula inn ∼. 
|-
| [[Balmjong_na_Viossa|balmjong]] || båmdjong, balmiåŋna || ||  maha neo ting hjerne kará
|-
| banan||  || tko|| Pitka sjot kira fraut. Brasmaklik ∼. 
|-
| baraban|| || ||"korokoro" ti joklik baraban fu ker, de.
|-
| [[baum]]||  || tko|| Stor isilik rupneting mit vetka au lehtiklane. Pikta ∼. Jam gamell ∼ ine nuncan fun. ∼klane.
|-
| bazi|| bagge || tko|| Fall fu qisaj djor mit ekse os plus jalaka. O viha ∼. ∼ moge kavaj. 
|-
| beng…||  || hadjiko|| 1. Gen, li na ejns rz surusma naj avare dan. 2. Mitrjo. O ∼maha afta kotoli. Owaridan, men gjenhadjiima. Da ∼spil!
|-
| benga||  || sko (jd)|| Har akote au inekrajs fu hant; s. gadant. Djiongena ∼. Fuwafuwa ∼. Pas zoll ∼ trist pasun.
|-
| bengaisu||  || tko|| Pasku fuwa isuting pr ataj pasun. Jam rju ∼ ine vove fun.
|-
| berk|| = fjall|| ||
|-
| berzoda||  || tko|| Sjot iskelik, ke har luft ine. Glug ∼.
|-
| bet||  || tko|| Plas pr kola au ilta. Baum∼. Fuwa ∼. Skoj na ∼ made.
|-
| bi|| || prko|| (tid) s. miraj za; k. pu. Kola wo ∼ ni djikan.
|-
| bides||  || prko|| Skojena ine tell fu ting au skeksaena kodr tell kara. Ajsta skoj ∼ sjot. Tajna naruga ∼ fjall!
|-
| bidra1 ||  || sko (jt mit jd)|| Har akote sebja, har ine hant, koske tula na jp made. O ∼ gavat mit un na vove fu mik made.
|-
| bidra2 ||  || prko|| Mit sebja, akote sebja. Dk harve denva ∼?
|-
| bidra3||  || ||  lik anta men altid. du andá dan kekso un made? a danki per gavat!” “sorè altid bidra kekso un made, du zolti aven 100” 
|-
| bira|| biira  || tko|| Kirkasena glugting, ke mahaena fu mura kara. ∼padji. 
|-
| [[tidcher#Mwai|biramwai]] || 10smwai, biiramwai || || sama "dens mwai"
|-
| bite|| bitte || tlko|| Ds. dabite. Hofle kotoba.
|-
| bjoze|| bose, boze, beze || lko || Kokara fu rova, triﬆ. O ∼ grun pasun ke viha feridjin. 
|-
| bjurke||  || lko (cuj vonating)|| Harena varuj asajsma grun varuj sluca mit zdorvasma; k. zdorva2 (ine 1n imi). Bli ∼. Li pas ∼, pas zoll naj erga pr bli zdorva. 
|-
| blageta||  || lk|| Ke aldjin deke se; k. djinsu. ∼ pocta inn VDS.
|-
| blau||  || lko|| Fu varge fu fere melan sinij au murasake. ∼ mare.
|-
| bli||  || sko (jt os jd)|| Kavare sebja. O bystra ∼ zdorva. Abazajudjin fun ∼ luna dan. Na dandah o se tk helena ona, ke pikta sama un. De o ∼ plusglau. Joku kotaba ine Vjosa ∼ qigau melan joku andere ko. Na soltid baum gen∼ midore.
|-
| blin||  || tlko|| 1. Brukena radi anta kokara fu bjose, rova, triﬆ. 2. Moge, fan. ∼! ∼dua afta.
|-
| [[kotobanen#fan-,_blin-|blin-]] || || || Knhoefli festako. Imi "takk" os "mange mange. 
|-
| bliznec||  || tko|| Nipe, ke sintua na sama tid. Samalik ∼.
|-
| bluma||  || tko|| Rupneting mit vargelk akama, ke anta fuwafuwa njoj; s. lule. Helena ∼. Inn Amerika snana gavat 12 ∼. 
|-
| blumatid||  || tko|| 1. Ejn fu kere tell fu tosi melan upaﬆid au soltid, sama 3s—5s muaj. 2. Tell fu tosi melan upaﬆid au soltid, koske upas bli iske au rupneting hadji rupne, pagoda plusvapa bli. Mogedjin dua ∼. 
|-
| boneka||  || tko|| Qisaj spilting, ke lik pasun os andere vonating. Qisaj ∼. ∼ pr lapse. Jam ekse ∼nen ine cesu.
|-
| bra1 ||  || lko|| K. varuj; ﬆor, djiju, djiong, fﬆoena, glau, helena. ∼sta! ∼djin. ∼ kokara. Dk moge ∼. 
|-
| bra2 ||  || trko|| Mit bra tropas. Erga ∼. Hanu ∼. Nildjin ∼ hanu Vjosa na ejns dag. O naj dekk bruk afta tk ∼ ende. 
|-
| bra3 ||  || tlko|| Ds. bra1 . Moge ∼. ∼, ke tua sluca dan.
|-
| bratulla|| || || 
|-
| bruk||  || sko (jt)|| Sada brasma afta kara. ∼ting. Aldjin ∼ kakutropas fu sebja. Djinklane ∼ alting pr maha vona fuvi plusbra. Vargelik hengestnen bruk miktajka radi vras. 
|-
| brun || kafe2 || ||
|-
| brur||  || tko|| Nipe fu mjeslik kun; ds. nipe. O har ni ∼. ∼ fun har hejn fu sore ine vove fun na imadah.
|-
| butiga|| magazin|| tko|| Plas, doka pas deke kaupa ting. 
|-
| bystra1 || vike|| trko|| Na hobittid; k. hidas. ∼ jingsaj. ∼ erga. Dk lera tk ∼! 
|-
| bystra2 || vike|| lko|| Dekiena skoj prara na hobittid; k. hidas; s. vike. Konele ∼ djor. 
|}


pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== C ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| cad||  || lko|| Bra. O moge bra, helena, ∼ pasun. Tua avto tk ∼!
|-
| cas|| = sardeska|| ||
|-
| casok|| = vala|| ||
|-
| catajn|| tsatain || lko|| Naj andere, mono afta; k. joku, mikava. O lesa joku ∼ libre. ∼ pasun moge varuj pr velt. 
|-
| cela||  = sinijplas|| ||
|-
| cempull|| cempul|| tko|| Kamiplas, doka ziha. Jam moge gamell ∼ ine Evropa.
|-
| cer||  || sko (jt)|| Suru, ke afta ni ting bli mit oﬆre brukting. ∼ sjot. 
|-
| ceric||  || tko|| 
|-
| cesu||  || tko|| Spill pr ni pasun oba kerek spilplas mit siru au kura boneka. ∼ plusplussiraena spill ine velt. O naj tk bra pr ∼, men nintenda!
|-
| cheng || || || da se risa [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| cigaret||  || tko|| Ting pr hene, ke anta pampisma au suru varuj pr zdorva. 
|-
| cruel || || || 
|-
| cu||  || sko (jd)|| Ajsa mit kuqi. Lakk we mit∼? 
|-
| cumara||  || lko|| Antaena kokara fu vilena siru afta, fﬆo afta, zipkvam sore; s. kjome. ∼ libre. Vjosalerasma moge ∼! Dk ∼ pasun. k. cumaranai 
|-
| cuna||  = cunaga|| ||
|-
| cunaga||  || tko|| Jerkat ting ke feﬆena ine sen. Djiong ∼.
|-
| curuk||  = suruk|| ||
|-
| cutcutt|| cutcut|| trko|| S. apar2 . Neadjin ∼ siru Vjosa. 
|-
| cyca||  || tko|| Berknen long pasunnetopa oba au fura. Ker fun ine ∼.
|}


pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== D ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| da||  || tlko (ine hadji fu fras)|| Brukena koske hanudjin vill, ke jd suru jt. ∼vi spill cesu! ∼naj naku bite. ∼bite anta tua na un made. ∼naj skeksa ende. 
|-
| dabite||  || tlko|| Fuwa spure; ds. da, bite. 
|-
| dada||  || tko|| Sevas mit lasku ejn kara na ekse made long all ﬆrela fu afta, ke brukena pr udacispill. Moge geltspill bruk ni ∼.
|-
| dadak||  || sko (na jp made)|| Byﬆra jingsaj. O ∼ na magazin made dan!
|-
| [[tidcher|dag]] || dah|| tko|| 1. Tell fu tid sama 24 djikan. 2. Tell fu tid melan solsintua au solsinu, os melan mora au kvell; k. naht 3. Tell fu tid melan asa au kola. Catajn pitka fu tosi 365.2422 e. Bra∼sta. Pitka ∼. Plusmogedjin erga na ∼ au kola na naht.
|-
| dah|| = dag|| ||
|-
| …daj||  || avariko|| 1. Stor. 2. Suru, ke impla fu atamakotaba plusstor os plusdjong. Baba∼. Vi dua∼ Vjosa. O zaju∼ dk. Pas zoll ugoku sebja na moge∼. Helena∼ fjall. kundur: -nen. 
|-
| dan1 ||  || tko|| Alting ke sluca de ima. Moge ting sluca na ∼. Vimekotaba hanu cuj ∼ fu djinklane.
|-
| dan2 ||  || tlko (ine avare fu fras)|| Brukena pr hanu cuj sluca na dan. O no rega na moranam ∼. O naj hanu tk moge na paratid ∼. De, gavor fu pasun ke tula hir na fura fun ∼, sore har glosa tk qigau fun! Men bra, ke afta sluca ∼. 
|-
| dan3 ||  || sko|| E dan. Aldjin ∼ vava.
|-
| [[kotobanen#-dan,_-ima,_-mirai|-dan]] || || || Snjano brukena suruko per. Imi sebja.
|-
| danaj||  || tlko|| Ds. da, naj. 
|-
| danke|| i|| tlko|| Svar za joku bra ting andere pasun kara; s. tak. Afta gavat pr dk! ∼. ∼ ke dk apeta un pr Vjosa. 
|-
| dare||  || tko|| Pasun ke naj siruena. Sore ∼? O naj siru, ∼ sintua un. 
|-
| darm||  = darma|| ||
|-
| darma|| darm|| sko (jd)|| Suru radi sore naj har djiju. ∼rum. ∼huome. ∼ pasun. Dk naj dekk ∼ un! 
|-
| dasos||  || tko|| Baumklane. Duwa vi poskoj ine ∼.
|-
| davaj||  || tlko|| S. davi.
|-
| davi||  || tlko|| Ds. da, vi.
|-
| de1 ||  || mitko|| Akote jt, ke sluca na miraj fu hina fras; k. za. O dusa na more, ∼ no. O zoll hanu, ke afta tropas fu kakuena fun sluca de o fsto kotaba ”qi”. O mjeta niltid tk moge cuj afta dan, de ima.
|-
| de2 ||  || tlko|| Brukena pr hadji nea mjetatell.
|-
| deke|| i, dekk || sko|| Har impla pr suru jt. ∼ti. Li pas siru Vjosa, pas ∼ apeta Vjosa. O naj ∼ fsto hanzikaku. dekinai -> se dekinai -> sekinai <- 
|-
| den||  || tko|| Lasku melan nin au denejn; 10.
|-
| [[Denva_(Ting)|denva]] ||  || tko|| Qisaj kompju ke deke bidra sebja. Stor ∼. Bystra ∼. ∼ fun moge hok.
|-
| der||  || tlko|| Ine tua plas. Danaj skoj na Rusilant made. Pasun varuj ∼. 
|-
| [[deza|deza]] ||  || lko|| S. trela.
|-
| diriri||  || tko|| Erkat ting pr maha moge ogoe zan. Vi zan ∼ denen namtid.
|-
| djabdell|| djabdel|| sko (jt os jd)|| Ugoku ejns ting na plas fu nis ting made au nis tingna plas fu ejns ting made. Li pas ∼ AB, pas sada ∼.
|-
| djarper||  || tko|| Samujvonaros djor iten jalaka.
|-
| [[netopa|djida]] || djido  || tko|| Paksu djiong tell fu rupneting (os mellantel fu djin)
|-
| djiju||  || lko|| Dekiena sentaku, suru ke. Aldjin zoll ∼ e pr velt plusbra.
|-
| [[tidcher|djikan]] ||  || tko|| Tell fu tid sama 60 fun os 1 fu 24 fu dag (ine 1s imi). Vi ring na 3 ∼ dan.
|-
| djin|| xin, jin,  = pasun|| ||
|-
| [[kotobanen#-djin,_-lant|-djin]] || || || 1. Per <likko>djin: pashuun ka imijena na <likko> 2. Per <suruko>djin: pashuun ka suru <suruko> 3. Per <tingko>djin: pashuun ka ije <tingko> 4. Per <namae>djin: plushoefli hanutropos fu <namae>
|-
| djinsu||  || lko|| Ke aldjin naj zoll se; akote sebja; k. blageta. Qi fun ∼! Dabite bruk ∼pocta.
|-
| djiong|| djion(g)|| lko|| 1. Dekiena maha moge erga; k. svanc. 2. Haﬆe pr vras; l. isilik. ∼ pasun. O vill bruk Vjosa na plusmogetid, men naj har tid os ∼sma pr afta grun hasteerga. ∼ baum 
|-
| djiot|| = kaku|| ||
|-
| djiug||  || sko|| Jingsaj za djor radi vras a no afta. ∼ pas konele na ukende pr nintenda.
|-
| djor||  || tko|| All vonating mena pasun. Stor ∼ acorlik au kriz. Qisaj ∼ kavaj. Plusduaena ∼ fun kitsune e. 
|-
| dk|| du || pko|| Pasun, hanudjin hanu na ke made; s. du. Denva f∼. ∼ ljetati pr rr au pelmeni? Ja, ∼! ∼ apar pinona perun. Al∼ bra e! 
|-
| doda||  dodo|| tko|| Fraut ke rupne oba baum au har djiong isilik koza.
|-
|dodamis
|
|tko
|Brun hobit djur ke snana gust nam dodo au gıra oba / siang na baum
|-
| dok || || pko || lik "du" men mit ni os plus pashun. 
|-
| doka|| doko || trko|| Ine plas ke naj siruena. Du ∼ e? O naj siru, sore vona ∼. 
|-
| dorang||  || sko|| Maha zan koske hene na kola. Ogoe ∼. 
|-
| [[du (kotoba)|du]] ||  || pko|| S. dk.
|-
| dua||  || sko (jt)|| Har bra kokara cuj afta; k. viha. O ∼ Vjosa. ∼ena boneka fun. A, du ∼ lesa, tk bra!
|-
| dudu||  || sko (cuj hengest)|| Skoj. Hengest ∼.
|-
| dujn||  || lko|| Naj dekiena bra cer; k. oﬆre. ∼ ajsta.
|-
| dukovo || || ||  [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| dusa1 ||  || tko|| Plas, doka sodji sebja. Vove fun har ni ∼! Naze? - 
|-
| dusa2 ||  || sko|| Sodji sebja ine dusa. Zoll ∼ na mogetid! - 
|-
| dusecka||  || tko|| Zajudjin, akotedjin, sladkidjin.
|-
| dvaj(b)ma||  || sko|| Suru ting, ke mus os zoll suru. Kompju fun naj ∼.
|-
| dvera||  || tko|| Tell fu tumam ke dekiena aukiena au kiniena. Lakk dk auke ∼ perun? 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== E ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| e|| est, ist, jest, jeste, es, je|| sko|| 1. Jam ine gvir, vona, harena, naj avare. 2. Brukena pr nojta ni ting (ine avare fu fras). Afta zoll tk simpell ∼. Jokudjin vill ke feridjin naj ∼ inn velt fuvi. O mjeta, sit o ∼. Tre rega apar rega ∼. Cesuspill lectespill ∼! Mjahvelt fuvi Gaja ∼. 
|-
| edenst|| || lko|| k. flire.  apárlík gwir iskatena, sena bides klárme, mit djoñ én kér én imi, ùten baflíre auau. aparlik otonalik
|-
| egal||  || tko|| ryoho bra. k. vikti. 
|-
| [[kotobanen#ej-|ej-]] || || || Magje klaani fu ting.
|-
| [[Ein (kotoba)|ejn]] || en, een ein, ajn, ain|| tko|| Plusplusapar ataj; lasku melan nil au ni; 1.
|-
| ekran||  || tko|| Kerajlik plas pr se zerisa oba afta. Plusplusmoge pasun har ∼ bides na altid. Kompju fun har stor ∼.
|-
| eksa||  || prko|| Imi fu ugoku jp kara; k. ine. ∼ vove samuj au iskelik e, men ine fuwafuwa au wapanen.
|-
| ekse|| i|| tko|| Lasku melan go au nana; 6.
|-
| ele||  || tko|| Oba fu vove; ds. poll. Apar pasun se na ∼ fu vove made. Vove fun har tk helena au vargeena ∼. 
|-
| [[kotobanen#-(j)ena|…ena]] ||  || avariko|| 1. Brukena pr maha likkotaba andere kotaba kara, snana surukotaba; ke suru afta, afta suru na ke made. 2. Brukena pr maha tingkotoba andere kotoba kara; ke akote. 3. Lik2 . O vill vona mit zaju∼ pasun fun. Zdorva nam∼ moge bra pr pasun. Afta vove har krajs∼ mada. 
|-
| [[Opetaklupau#'imawen'_au_'ende'|ende]] ||  || tlko|| Na imatid, hataa de os za. O naj ∼ hell fsto Vjosa, men o iskat hanu. 
|-
| [[kotobanen#er-|er…]] ||  || hadjiko (mit sko)|| 1. ting ka surujena/estena altiid inya mirai, au tuo ting er’nai yamete’mir. 2. Ejn rz. ∼lera Vjosa. Vill we ∼kuqifesta? 
|-
| erga1 || ergo || sko|| Suru pr maha bra jt. Aldjin mus ∼ pr namena.
|-
| erga2 || ergo || tko|| 1. Ergasma. 2. Plas, doka jd erga. Mik fun har bra ∼.
|-
| [[tidcher#Mwai|ergamwai]] ||5smwai, ergomwai || || sama "gos mwai"
|-
|esku
|
|sko
|apàr lik âpu, "maha bra na". ttb. ryoshin mus ~ vauva. Deki har kot, men de du mus ~"
|-
| etuni || || ||  Un ~ ting na tumam. Ting etugnéna = ting nai deki ugóki
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== F ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| [[faerie|faerie]] || || || stuur namae per tropos fu dua, kun, au qi fu pashuun je. Faeriedjin chigau ka glavna miettana fu veltklaani.
|-
| fall|| fal|| tko|| Samaena klane fu jt os jd. Gaja har tk moge ∼ fu pasun.
|-
| [fami|fame]]|| i|| tko|| Djinklane ke feﬆaena mit vonarosnojta os zajunojta. Glau ∼. O naj zaju ∼ fun grun sore varuj perun. 
|-
| fan||  || tlko|| 1. Brukena pr nase ﬆor kokara nafrasmade. 2. Mogemoge. 3. S. blin. O ∼dua Vjosa. Dk ∼ maladec!
|-
| [[kotobanen#fan-,_blin-|fan-]] || || ||Knhoefli festako. Imi "takk" os "mange mange"
|-
| fansuka||  || lko (cuj klane)|| Harena moge fall os moge qigau impla. Vjosa har kotaba ∼ glosakara.
|-
| farge||farje<br>farve<br>fare|| || <i>s. kotoba [[#ko_varge|varge]]</i>.
|-
| fdk||  = fu dk|| ||
|-
| fedora||  || tko|| S. pipa.
|-
| fere|| i|| tko|| Ting ine sinijplas, ke har all vargenen namurasakemade rjukara. Helena ∼ ine sinijplas. 
|-
| feri…||  || hadjiko|| 1. Ds. fere. 2. Akote fall fu zaju au kun. ∼klane. ∼djin. 
|-
| fermis||  || sko (jt os jd)|| Har varuj kokara grun naj se afta os sore na pitkatid. ∼ dk, sladkidjin. ∼ vjosalerasma.
|-
| festa||  || sko (jt)|| Maha nojta melan afta. Pasun mit∼ pr maha fame. 
|-
| fig||  || lko|| Gvirnaj. Ejnnorhengest ∼ djor e. 
|-
| fina|| fynne, finna|| sko (jt)|| k. milu. Du milu ting, du suha ting, de du finna ting
|-
| fjall|| berk|| tko|| Moge pitka plas fu gaja; s. berk, montann. Everest pluspluspitka ∼ ine velt e.
|-
| flakka || || || Tatoeba al lant har ejn flakka fu sebja
|-
| flan||  || lko|| Varuj pr namena. ∼ banan. Tua ovasi ∼. 
|-
| flanca||  || tko|| "fura flanca, para flanca, hasbang" 
|-
| flire||  || lko|| Glau, bra, hjakuena, nintenda. Vi ∼, koske vi mitrjo.
|-
| flutur||  = kipepeu|| ||
|-
| [[fugel|fogell]] || fogel, fugel, fugle|| tko|| Djor ke deke ljeta au har pero. Sorr moge dua ∼. Na blumatid zuruktula ∼. 
|-
| fras||  || tko|| Joku ataj fu kotaba ke feﬆaena, ke har imi. Afta ∼ trela.
|-
| fraut||  || tko|| Sjot namting ke rupne oba joku baum os baumnen. Ojsi ∼. Tua fall fu ∼nen purne akote vove fun ima!
|-
| [[kotobanen#-fşa|-fşa]] || || || Antaasor bistrazma os kalaplik asmi na suruko.
|-
| fsto|| fresto, frsto, fshto || sko (jt)|| Ersiru afta; mahaklar afta pr sebja. Naj hell ∼, lakk we genhanu? O naj deke ∼ hanzikaku, men ∼ kirilkaku. Dk ∼ imi fu ”hauqi”? ∼ Vjosa ima!
|-
| ftede||  || trko|| Na asoka tid. O lera Dojcosa ∼, men ima vasu.
|-
| fu <span class="anchor" id="ko_fu"></span>||  || prko|| Brukena pr feﬆa ni ting, au nis ting cuj ejns. Jam moge tropas ∼ kaku Vjosa. Bambamdah ∼ Amerikalant na 4s dag ∼ 7s muaj. O vona ine vove ∼ rujqin ∼un. Rusiosa mamaglosa ∼un e. Kakutropas ∼un mona bruk kirajn ∼ Anglosa. Njulik mahaena ∼ sjor nju kara.
|-
| [[kotobanen#-fu-,_-no-|-fu-]] || f-, v- || || Snjano brukena tingko per, men deki al fal fu kotoba. Brukjena per hanu jokuting har andr jokuting. Tatoeba, ringo'''fu'''un imi "afto ringo ka un har"
|-
| fuga||  || tko|| Klane fu 36 os 52 paperilehte ke har 4 fall, ke brukena pr fansuka spill.
|-
| [[tidcher|fun]] ||  || tko|| Tell fu tid sama 60 so, os 1 fu 60 fu djikan. Treng 40 ∼ pr tua stolspil.
|-
| f'un|| fun || (terudena koklani)||<i>imi [[#ko_fu|fu]] [[#ko_un|un]]</i>.
|-
| fura||  || tko|| Strela, se au skoj na ke made; k. hina. Vove fun na∼made fdk! 
|-
| furi…||  || hadjiko|| Akote isu1 fu spilena fig vona. Vi skoj na ∼plas made na aftadah. Dua lese ∼libre. 
|-
| fuwa||  || lko|| K. isilik. ∼ bet. 
|-
| fuwafuwa||  || lko|| Antaena bra, vapa, sjot kokara; k. ike. ∼ sluca. Dk moge ∼.
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== G ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ga||  || sko (jt jd os jp kara)|| Suru, ke har afta. Da ∼ ejn sjotting! All lant ∼ gelt pasun kara. Sore varuj∼ all gelt butiga kara!
|-
| gadant||  || sko (jd)|| S. benga.
|-
| [[gaja|gaja1]] ||  || tko|| 1. Koza fu Gaja, rupneting rupne ke kara. 2. Tell fu Gaja iten iske. Jam bra ∼ hir. Samuj ∼ za upastid. O se ∼!
|-
| Gaja2 ||  || tko|| Namae fu mjahvelt doka pasun vona. Sinij ∼. gameldjin, tko. 1. Ds. gamell, pasun. 2. Namaenen fu pasun ine Vjosadiskordserver, ke jam, koske Vjosa sintua.
|-
| gamell|| gamel|| lko|| Eena na pitka tid, harena moge hisfull; k. nea, maloda. ∼djin. Pasun treng zdorva e, pr vona na gamel. Joku pasun hanu ∼ gavor fu Vjosa.
|-
| gamen||  || tlko|| Brukena li hanudjin suru varuj jt dan au sit ajsa varuj kokara. ∼daj. O vras denva fdu, ∼.
|-
| gami||  = zaju|| ||
|-
| gatov1 ||  || lko|| Enda bra pr bruk os deke suru jt. Kotoli fdu we ∼ pr lesa? Sta we ∼? Da erhanu na un made, koske dk ∼. O ∼ pr lera Vjosa!
|-
| gatov2 ||  || sko (jt os jd pr jt)|| Suru, ke afta os sore gatov. O ∼ sebja pr ring na afta mora. Du ∼ we denva fdu dan?
|-
| gatov3 ||  || sko (namting)|| Maha. O dua ∼. ∼ amlet pr moranam. O ∼ na kvell pr moranamtid. 
|-
| gavat1 ||  || tko|| Ting, ke antaena pr maha miksma au bra asme. Bra ∼. Pasun sada ∼ na sintuadah fusore.
|-
| gavat2 ||  || sko (jt na jd made)|| Anta gavat. Sorr ∼ avto na un madd!
|-
| [[govor fu viossa|gavor]] || govor  || tko|| Glosatropas fu ejn pasun os djinklane. Jam mode Anglosa∼. O lera cuj moge ∼ fu nort fu Italia! ∼ fun bruk kirilkaku.
|-
| gdend||  || sko|| Maha glina kara. Jam vime, ∼ gamelkame pasun dandan.
|-
| gelt||  || tko|| Ting, ke brukena pr kaupa au hok, mahaena erkat os papere kara snana. All lant ine Evropa bruk sama ∼fall. Aldjin vill har ∼ pr namting au vove.
|-
| gen1 || gien || trko|| Na naj ejns rz. O kaku afta kotoli ∼. Aldjin mus no ∼ au ∼ na aldah. Dk trist we ∼?
|-
| [[kotobanen#gjen-|gen2 …]] || gjen- || hadjiko|| 1. Naj jamete. O ∼vona ine Rusilant. 2. Imi "afto ting suru andr raz"
|-
| gent||  || tko|| Zusewomting mahaena glina kara mit vapa. Vapahuomi fun mahajena ∼ kara. 
|-
| geomqi||  || tko|| 1. Herus. 2. Pasun ke bruk herus. ∼klane. Djiong ∼.
|-
| gi||  || tko|| Ting, vill pas suru. Har o nill ∼ na lapsi fun dan.
|-
| gid||  || tlko|| Hanujena koske pas glau. Tk o mik fun duwa, ∼!
|-
|gira
|
|sko
|(Hidas)shkoi na koza fu ting. ttb. dodomis gust gira oba baum. Gira oba sama sjang
|-
| glas||  || tko|| Kliar isi mahajena fu sant kara mit vapa. Jam moge ting ine vove fun mahajena ∼ kara: mada, klinje, denva, auauau. 
|-
| glau||  || lko|| Harena bra kokara; flire, nintenda; k. triﬆ. ∼ pasun. O ∼. Li o ende har all benga, sit o har all ∼sma. Mus skoj na Dojcland made pr har ∼sma.
|-
| glaube||  || tlko|| Brukena li hanudjin naj siru li sure pravda os uso. ∼ naj. ∼ naj jam ko pr afta. Vi deke hanasu plus na mora ∼! Ukrainalant ∼ ing krig kodr Rusilant.
|-
| glawona||  || lko|| Lectevikte. Vona ∼ ting e.
|-
| [[glossa|glosa1]] || glossa || tko|| Brukting pr anta au sada sirusma. Jam moge ∼ ine velt. Vi naj hanu ∼ qigau Vjosa hir. 
|-
| glosa2 ||  || tko|| Tell fu netoka ine kuqi, ke ajsa smak au maha koj. Sore bruk ∼ moge bra. 
|-
| glug||  || sko (iskelik)|| Ugoku afta na malge made bides gorla. Vill ∼. All vonating mus ∼ iske pr vona. 
|-
| gnute|| i|| sko (jt)|| Suru, ke afta naj sen. O naj deke ∼ sebja bra. Ak, o avn minusgnutidekilik, hata dan.
|-
| go||  || tko|| Lasku melan kere au ekse; 5.
|-
| gomen || || || 
|-
| goreng || || || maha namting med vapa ishkje
|-
| [[netopa|gorla]] ||  || tko|| Tell fu djinnetopa melan netopa au akama, ke brukena pr maha glosazan au no. Bjurke ∼.
|-
|gormoi
|
|tko
|Ttb plas ine ter. ~ dekti cheng os idaun.
|-
| gozscha||  || tko|| kiraijngozscha. 
|-
| grenza||  || tko|| Samujvonaros djor, ke moge hidas oba lant, mit isilik kjomuske inekrajs netopa fu afta.
|-
| gris||  || lko|| Fu varge melan kura au siru. ∼ polis. ∼ sinijplas. 
|-
| grun1 ||  || mitko|| Hina ting ke trengena os dan; k. sit. O trist, ∼ sintua ine Rusilant. Vjosadjin lera glosa ∼ tua nintenda. 
|-
| grun2|| grunan? || tko|| Ting os sluca, ke trengena os dan de jt sluca. Bra ∼. Jam moge ∼ pr lera Vjosa, men o vasu all tua. 
|-
| guau || || || ~ sama 🤯
|-
| guca|| gusho, gusjo || sko (jt os jd)|| Mahascoı na du cara. Ugoku afta os sore na prara made; k. tine. ∼ sore. O ∼ dvera, men afta naj auke.
|-
| gugha||  || sko|| sugha mit gugel, gugelsugha -> gugha. 
|-
| gunro||  || sko|| 
|-
| guste || ||sko|| ein mik es ein pashun un guste. 
|-
| gvir||  || lko|| Pravda; eena ine velt fuvi; k. fig. Velt fu pone naj ∼, men o vill maha mik mit sore! Vjosa ∼ glosa. 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== H ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| hadji1 ||  || sko|| Ende e; k. avare. Ima bra vona ∼.
|-
| hadji2 ||  || sko (jt)|| Suru enge; k. avare. O ∼ afta kotoli kaku na dantosi.
|-
| hadji3 ||  || tko|| Plas os tid, doka jt hadji; k. avare. Jam helena lehte ine ∼ fu afta libre.
|-
| haisa|| hysa|| || Namai fu un Donald = Un haisa Donald
|-
| hal||  = sall|| ||
|-
| hamas||  || tko|| Qisaj sira isi ine kuqi. Zdorva ∼. Sardeska har tre os kere ∼nen snana. 
|-
| hambak||  || lko (cuj jd)|| Harena obamoge vere; harena apar hisful; l. baka; k. hoja.
|-
| han||  || tko|| Ejn tell fu ni. Jam tolka ejn rega. Vill we ∼?
|-
| [[netopa|hana]] ||  || tko|| Tell fu netopa ine melan fu kava, ke brujena pr njoj. ∼ fun stor e.
|-
| hanasu||  || sko|| Mithanu. Sorr ∼ na tkpitkatid dan.
|-
| hanga|| skvala|| tko|| Djiugena ﬆor sakana ine mare. Mje mogedjin, ke ∼ kavaj e.
|-
| [[netopa|hant]] ||  || tko|| Ni tell fu netopa long oba fu netopa ke brukena pr suru. 
|-
| [[netopa|hantnen]] ||  || tko|| Tell fu netopa long avare fu hant, long ke 5 jube. 
|-
| hantpolvi||  || tko|| 
|-
| hanu||  || sko|| 1. Bruk Vjosa. 2. Bruk Vjosa mit kuqi. 3. Deke bruk catajn Vjosa. Da ∼ ine ring we? Sore mit∼ ima. ∼ we Vjosa?
|-
| hapiga||  || pko|| Asoka plas. Vona sore ∼. 
|-
| har1|| hav || sko (jt)|| Jam akote sebja. Dk ∼ we stift? Vove fun ∼ stor kuhnja. Ende naj lake ∼ pitka har. 
|-
| har2 || hor, hör|| tko|| Fuwa ting ke purne long oba fu akama. Sorr har helena ∼. Ende naj lake har pitka ∼. 
|-
| haste1 ||  || lko|| Trengena moge erga, zeus, mjeta; k. simpell, prosta. Afta isajka moge ∼. 
|-
| haste2 ||  || trko|| Ds. haﬆe1 ; k. proﬆa, simpell. Skojena na Dojcland made moge ∼. Vjosa naj ∼ pr lera. 
|-
| [[hotia|hata]] ||  || mitko|| S. men, mena. 
|-
| hatati||  || trko|| Naj unamoge. Treng ∼ 20 stift pr leradjin.
|-
|hau
|
|sko
|koske gormoi bli plustur. k. oum
|-
| hauqi||  || lko (cuj jd)|| Vilena siru os fﬆo jt. ∼ pasun snana dua lesaena. 
|-
| hav1 || har1 || ||
|-
| hav2||  || tko|| maredai. 
|-
| hawag || || sko || kundur makipot. sama "maha stor".  [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| hejn|| hujn|| tko|| Qisaj njantaena djor, ke apu pasun. Namae fu ∼ Broski e. 
|-
| hejva||  || tko|| Naj esma fu krig; k. krig. Mus skoj na ∼ made. Krig au ∼. 
|-
| helena||  || lko|| Eena bra pr seena; k. niqiﬆa. Se tk moge ∼ zusevomting ine Evropa dan! Mje all risa fdk moge ∼! Dk avn ∼. 
|-
| hell||  || lko|| Harena all tell fu sebja; harena nill ahare. Ukrainalant naj ∼ za Rusilant. 
|-
| hene||  || sko|| Nase luft na hana os kuqi made; k. rause. Vint ∼ ima. 
|-
| hengest||  || tko|| Stor njuantaena djor, pasun skoj oba ke. 
|-
| henopit|| xenopit || trko? || mange mange mange lik "obamange"
|-
| heok||  || sko|| S. jingsaj.
|-
| herus||  || tko|| Stor ajﬆa brukena pr krig; s. geomqi (ine 1s imi).
|-
| hidas1 ||  || trko|| Na hobittid; k. byﬆra. Sore moge ∼ aja. 
|-
| hidas2 ||  || lko|| K. byﬆra. ∼ djor. 
|-
| hina||  || tko|| Strela ke k. fura. 
|-
| hinavitu||  || tko|| Dvera ine hina fu djor au pasun. s. perse? 
|-
| hir1 ||  || sko|| Fﬆo brukena korva. Sorr naj deke ∼. ∼ we afta? 
|-
| hir2 ||  || trko|| Ine afta plas. O ∼ ende. Dk doka e? Da tula navjosadiskordservermade! Jam bra pasun ∼. Naj hanu ∼ na moge tid dan.
|-
| hisfull|| hisful|| tko|| Sirusma, sada ke za tid, lera, lensi, erga, suru. Dk har we ∼ pr aja?
|-
| hiven|| marozena|| tko|| Namting, mahaena fu sjot njuupas kara. Moge dua ∼ na soltid. 
|-
| hjaku1 ||  || tko|| Den rz den; 100.
|-
| hjaku2 ||  || sko|| Maha hobit zan grun flire, nintenda, glau. O spar dan, de sorr ∼!
|-
| hjerne||  || tko|| Tell fu netopa ine akama, ke brukena pr mjeta. ∼ fun qisaj e. 
|-
| hobit||  || lko|| Eena plusﬆor ine paksu plas; k. pitka. Sorr ∼. [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| [[tidcher#Mwai|hobitmwai]] || 2smwai, hobbitmuai || || sama "nis mwai"
|-
| hofle|| i|| lko|| Hanuena bra, fuwafuwa, tk ke treng; k. kusipa. ∼ hanasusma. 
|-
| hoja||  || lko (cuj jd)|| Harena moge hisfull; l. svinur; k. hambak. Dk moge ∼.
|-
| hok||  || sko (jt)|| Anta ting pr sada gelt; k. kaupa. Aldjin deke ∼ erga fsore. 
|-
| hona||  || tko|| Moge vapa luft, ke anta kirkas1 , au ke brukena pr gatov namting au maha erkat. ∼ moge helena. 
|-
| hosaj|| hosoi || lko|| Eena minusﬆor ine hobit plas; k. paksu. Ejn papere ∼ e. [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| [[hotia|hotja]] ||  || mitko|| s. hata, men pluhofle.
|-
| [[kotobanen#-htella|-htella]] || || || 1. Biistra slucha 2. Mahklaar ka joku kawari 3. Apaartid suru, andrtid surunaj. 4. Xiras rupne/suru/kavari/blı bidjes tid. 5. Samalik Po- 
|-
| hujn|| = hejn|| ||
|-
| humba|| = mure|| ||
|-
| hungca|| = iskat|| ||
|-
| huome|| = vove|| ||
|-
| hur||  || trko|| Mit ka tropas. Pas ∼ lera Vjosa? Dk suru afta ∼?
|-
| huske||  || sko|| Siru, har ine hjerne. k. vasu. Dk ∼ we afta ko? O bra ∼ koske vi znakoma dan 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== I ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| idaun||  || prko|| para os prara unna ter. [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| ijo||  || tko|| Iskeona.
|-
| ik||  = uk2 || ||
|-
| ike||  || lko|| Antaena varuj kokara; k. fuwafuwa. ∼hanasukaban. Tua moge ike perun. Davi naj hanu cuj? 
|-
| iken||  || tko|| "hanu mange tsui afto glossa, au de sore antaa iken fu sore sebja tsui mahossa." 
|-
| ikka||  || tko|| Pash ka suru iketing. 
|-
| ilta||  || sko|| E oba jokuting mit hell netopa. O dan bjurke, sit o ∼ na hell dag. Aldjin dua ∼ ine bet tolka. 
|-
| ima1 ||  || tko|| Alting ke sluca naj na dan, naj na miraj; afta tid. O dua vona na ∼, men ti plusbra li o vona na miraj.
|-
| ima2 ||  || tlko (ine avare os hadji fu fras)|| Brukena pr hanu cuj sluca na ima. O naj lake hanu ∼. O avn viha koj fun, men o naj dekk lensi ∼, akote trist. O hanu Rusiona, Anglosa, Vjosa, au o lera Dojcosa ∼. ∼ mus djabdell joku mahaklarsma. ∼ fsto! O dan apetadjin, o kaku libre ima. Dk vill hanu we ∼?
|-
| ima3 ||  || sko|| E na ima, hata naj na dan. O ∼ bra! Dan rusidjin, ∼ dojcdjin!
|-
| [[kotobanen#-dan,_-ima,_-mirai|-ima]] || || || Snjano brukena suruko per. Imi sebja. 
|-
| [[Opetaklupau#'imawen'_au_'ende'|imawen]] || || || 
|-
| imi||  || tko|| Impla fu kotaba, pasun ke fﬆo; ting ke kotabalibre anta. Bra ∼. Joku kotaba ke har sama os lik ∼ dan, ima tua har moge qigau hata akote ∼. Rjoha har we sama ∼, akrat? Ka ∼ fu afta? 
|-
| impla||  || tko|| Varge, imi, njoj, smak, zan, asme, auauau. Siru we ∼ fu afta stof? Dekk kriz! 
|-
| ine||  || prko|| Melan ejn ting; e krajsena; k. eksa. Tua pasun ∼ darmrum ima. Sjot aven lakiena gatov ∼ toreu. Jam all kavarisma ∼ kotoli fun! Jam apar so ine akote all namting. 
|-
| inekrajs||  || tlko|| Na all ﬆrela jt kara. Iske ∼ fun.
|-
| ing|| jing, ying|| tko|| Bra, vilena avare fu krig, toutoko os spill; k. humba, mure. ∼dah. O na altid sada ∼ ine slucaspilli! 
|-
| inona||  || sko|| Vill ke jt zoll pravda e. O ∼, ke o lake tula, men naj siru tabun. ∼ti ke o lakk povarge jube fun miraj os kava fun. Tk ∼ ke alall bra ine vona fdk! Inona o dekk inn Dojclant skoj. 
|-
| ip||  || tko|| Tuhatdaj. ∼ni sama tuhattuhat. 
|-
| isajka||  || tko|| Sluca pr ke treng mjeta au iskat. Haste ∼. Zerdjin har moge bra ∼ cuj kakutropas fsore dan. 
|-
| isi||  || tko|| Snana krajslik os na apartid oﬆre telting fu gaja kara. Stor ∼. ∼nen. 
|-
| isilik||  || lko|| Lik isi pr ajsa; l. djiong (ine 2s imi); k. fuwa. ∼ baum. Afta isu oba∼! Naj bra pr suvaru. Jam ∼ au fuwa mitzam ine Rusiona. 
|-
| isitacu||  || tko|| Ting oba plas, sinujena pasun doka, jam kotaba oba afta cuj sore. Sinu more pasun ine Ukraina, a naj sada sore ∼ miraj.
|-
| iskat|| hungca|| sko|| Bruk moge zeus au moge djiong pr suru jt; s. hungca. O naj ∼ dan na skola. O ∼ suru plusbra pr sebja ima. 
|-
| [[ishke|iske]] || ishke || tko|| Kliar ﬆof ke maha vona, mara, deke sama kaban e. Ojsi ∼. 1s badji har ∼ plusmoge 2s. Mus glug ∼ pr vona. O naj deke anta svar fu sapah ogoe ∼. 
|-
| iskelik||  || tko|| Stof ke lik iske; dekiena sjan ine padji os klinje. 
|-
| iskenaruga|| virta|| tko|| Naruga oba gajakoza, skoj doka iske.
|-
| ist||  || tko|| Strela fu velt, doka solsintua sluca; k. veﬆ.
|-
| isu1 ||  || tko|| Ting pr suvarusma fu ejn pasun. Fuwa ∼. Jam helena ∼ ine vove fun. 
|-
| isu2 ||  || tko|| Ting ke mahaena radi anta mikava kokara. Helena ∼. Joku pasun treng maha ∼.
|-
| it||  || sko (jt)|| Ugoku afta bides luft mit byﬆra ugokusma fu hant. ∼ mjac.
|-
| -it||  || || har mange. isiit=har mange isi. 
|-
| itn|| utn|| prko|| Naj harena; k. mit. Bjoze, vere, ∼ glau. O mjeta ke zamisalidjin maha moge nea ko ∼ apu demisalidjin kara. O zusevom nea glosa ∼ zan ende ima. 
|-
| ivaj||  || sko|| Suru klane fu nintenda ting, grun catajn bra dag os sluca. Dk vararikun? Zoll ∼! 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== J ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ja||  || tlko|| Hanuena koske hadji os avare hanasu mit jd. 
|-
| jac||  || tko|| Slagsma.
|-
| jajco|| yaico, jeitso, eg, webo, aajco|| tko|| Krajslik ting, ke antaena fogell au atekse kara, ine ke vava fu tua djor, au ke brukena pr no. ∼ au nju maha amlet. 
|-
| [[netopa|jalaka1]] || ialaka, yalaka || tko|| Ni tell fu netopa long una ke brukena pr skoj. Pasun ni∼ena djor itn pero. 
|-
| jalaka2 ||  || sko (na jp made)|| Skoj brukena jalaka naj byﬆra. Treng ∼ na aldah pr bra zdorva. 
|-
| jalakaklea||  || tko|| 
|-
| jalakanen||  || tko|| Tell fu netopa long avare fu jalaka, long ke 5 jube. Trag tufell long ∼. 
|-
| jalakasi|| kasijalka, kazhalka || tko||  bage mit kasi jalaka. ~ etuni ander bage ine krajsret.
|-
| jam||  || sko|| E ine jp. ∼ go rega ine kaban afta. ∼ bra pasun inn all lant. 
|-
| jamete||  || sko (suru)|| Naj suru ende, plus; k. gen2 . Da ∼! O ∼ skoj na aldah grun erbjurke. 
|-
| jan||  || s|| har. 
|-
| jatazahull|| jatazahul|| sko|| K. sucu. O ∼ inn skola grun naj vikte perun.
|-
| jerkat|| erkat || tko|| Isilik gris ﬆof ke dekiena gnutiena. ∼ena sardeska.
|-
| jevalt||  || lko|| Lecte vikte; s. atama (ine 2s imi). ∼djin. 
|-
| jingsaj||  || sko|| Byﬆra jalaka; s. heok. ∼ vikte pr zdorva! Mus ∼ ima pr e na pravda tid! 
|-
| …jk1 ||  || avariko (brukena mit lasku)|| Harena joku ataj fu uk2 . Kere∼. 
|-
| jk2||  = joku|| ||
|-
| joku|| jk, yoku, jok, yok, ioku|| lko|| 1. Eena naj siruena, os naj catajn, os naj treng, os naj hanuena. 2. Mikava. ∼djin. ∼plas. Jam ∼ nea ko pr mahaklar! Ima mus djabdell ∼ mahaklarsma, ke o kaku na ejns tid dan. Du na altid lake anta spure na ∼ vjosadjin made li naj fsto ∼ ko.
|-
| jube|| i|| tko|| Tell fu djinnetopa, jam 5 fu ke long ejn hantnen os ejn jalakanen. Pasun bruk jube fu afta pr erga mit brukting. 
|-
| jugent|| yugent|| sko? || bli tel fù (yokting). szkoi inye (klani). dan jugent du server to. 
|-
| jugida|| ||sko || Stor djor ~ hobit djor au sit stor djor nam hei
|-
| Jull|| jul, yul || tko|| Ivajdah 24-26s dag fu 12s muaj. 
|-
| [[tidcher#Mwai|jullmwai]] || 12smwai || || sama "den-nis muaj"
|-
| jurište|| || || sama "al bra"
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== K ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ka1 ||  || pko (brukena pr spure or hanu cuj jt hanudjin naj siru ke)|| Jt. Dk hanu ∼ dan? Afta ∼? ∼ sluca ine ring dan? O mjeta dan, ∼ sluca li o har tolka uk os muaj na vona. 
|-
| ka2 ||  || lko|| Lik ka. Dk uda ∼ fall fu rega? Dk vill ∼ varge? Afta ∼ avto? He dekk hanu ka glosa? 
|-
| ka3 ||  || tlko|| Brukena pr anta catajnnaj spure. ∼?
|-
| [[kotobanen#-ka|-ka]] || -ca|| || 1. A: "lesaca Du!" A hanu ad "Du" pere lesa. 2.joc ce: a) rœœ + -ca → rœœca ("joc ce rœœ") b) cola + -ca → colaca ("joc ce cola") c) daremena + -ca → daremenaca ("joc ce daremena") d) sjcolanje + -ca → sjcolanjeca ("joc ce inje sjcola") 
|-
| kaban||  || tko|| Ting ke deke har jt ine afta. Hanasu∼. O sjan mura fun ine ∼. 
|-
| kafe||  || tko|| Blageta namplas. O na niltid no ine ∼. 
|-
| kafe2||  || tko|| 
|-
| [[tidcher#Mwai|kaisarmwai]] || 7smwai || || sama "nanas mwai"
|-
| kaiser || kaiza || ||  
|-
| kajf||  || tko|| Bra kokara.
|-
| kaku|| kake, djiot|| sko (jt)|| Risa glosa oba papere os andere ting. O naj deke ∼. Sore ∼ libre. O avn vill melanosakotoli ∼ miraj.
|-
| kalap||  || trko|| Sluca, hata naj siru pas dan. Rmskoj ∼ mik fun naunmade dan, tk glau! 
|-
| kame|| i|| tko|| Joku vonating ke maha velt au pasun, ke deke suru alting. Jam we inona pr ∼? 
|-
| kanele|| i|| tko|| Qisaj njuantaena djor mit pitka korva au djiong hinajalaka. 
|-
| kanfuz||  || tko|| Trelasma. 
|-
| kar||  || tko|| Tell fu netopa melan jalaka pr qi, doka afta ugoku ine. Mogemjes mjeta ke ∼ moge treng. 
|-
| kara||  || prko|| 1. Imi fu ugokuena plusplusprara fu jt; k. made. 2. Ke maha mit jt. O skoj skola ∼. Mena, jam tolka netopalik ajsa, nill bra kokara afta kara. Sardeska mahaenna fu erkat ∼. O Rusiland ∼. 
|-
| [[kotobanen#-kara,_-made|-kara]] || || || ds. kara
|-
| karoten|| sakare (sakari)|| tko|| Pitka isilik portugale ovasi. 
|-
| karte|| i|| tko|| Lehte fu papere ke brukena pr siru doka. ∼ fu Amerikalant. 
|-
| kartofell||  || tko|| Isilik kofe krajslik ovasi. ∼sta.
|-
| kase||  || tko|| Lasku melan nana au nin; 8.
|-
| kataj||  || lko|| Fu ka ataj. Du har ∼ rega ine kaban fdu?
|-
| katana||  = ajﬆa|| ||
|-
| kaupa||  || sko (jt)|| Anta gelt pr sada afta; k. hok. ∼ nea denva. Tabun imadah mus ∼ plusmoge sardeska.
|-
| kava||  || tko|| Fura tell fu akama. O dua ∼ fu zajudjin fun. ∼ fdk moge kavaj. 
|-
| kavaj||  || lko (cuj jd)|| Helena, qisaj, antaena bra kokara; s. ﬆakar. Tua djor moge ∼! ∼ pasun. 
|-
| kavare1 || i|| sko (jt)|| Suru, ke afta bli qigau. ∼kun. Sore naj vill ∼ pr zajudjin fsore.
|-
| kavare2 ||  || sko|| Bli qigau. Na tid, koske o kaku kotoli fun, gavor fun ∼ moge dan! Vjosa zoll ∼!
|-
| [[Faerie#Kwarikun|kavarikun]] || kwarikun  || lko|| Pasun, kun fu ke usoena antaena na sore made koske sore sintua; pasun dare kavare kun fusebja. Mahadjin fu afta kotoli ∼ e! All ∼djin moge qilik e.
|-
| kaveg||  || tko|| Tumam fu kuqi leva a migi. Koske hanu wo mit sore, bli ∼ fun rju.
|-
| kazif||  || lko|| K. temiz; sodjijena. ∼ vove.
|-
| ke1 ||  || pko|| Jt ine hina fras. Jam moge pasun o zaju KE. Gavor fu pasun ke tula hir na fura fun dan, sore har glosa tk qigau fun!
|-
| ke2 ||  || mitko|| Feﬆasma melan surukotaba. O vill suru ∼ veltplusbra. Dk lera moge bra Vjosa, sit o siru, ∼ dk moge bra hanu ine ring aven miraj! Prosta hanu na aldjin made, ke du vill ring.
|-
| keksa||  || tko|| Tortnen. Mama fun maha ∼ ima.
|-
| ker||  || tko|| Tell fu netopa ke ugoku vonaros bides vonarosnaruga. ∼ erga na all vona. 
|-
| keraj||  || tko|| Kerejk mit ﬆrela fu sama pitka.
|-
| kere|| kiere|| tko|| Lasku melan tre au go; 4.
|-
| kerfraut||  || tko|| Rju kerlik sjot fraut, ke rupne akote gaja. Brasmak ∼.
|-
| keste||  || sko (jt)|| Ugoku afta prara grun naj treng. ∼ flan fraut. 
|-
| -ki|| || || ttb. hanuki = deki hanu
|-
| kicune|| kicuneli|| tko|| Njuantaena hujnlik portugale, kofe, os gris djor mit pitka fuwa rofaj.
|-
| kine|| i|| sko (jt)|| K. auke. Danaj vasu ∼ mada miraj!
|-
| kipepeu|| flutur|| tko|| Letajena bazi mit ﬆor qibas. Fina pas moge helena ∼ na blumatid. 
|-
| kira||  || lko|| Fu varge fu fere melan partugale au midore. ∼ soll. 
|-
| kirajn||  || tko|| Risanen pr kaku glosa. Kirill au latinkaku har qigau ∼, hata sama dandaj. 
|-
| [[circas|kirkas1]] ||  || tko|| Ting ke skoj soll kara, hona kara, ke apu se au anta apar vapa. Jam apar ∼ ine afta rum. 
|-
| kirkas2 ||  || tko|| Kliar isilik ke mahaena sjot kara, jam ine vinja, bira au a. O naj har gelt pr ∼ ima. Ojsi ∼. 
|-
| kiva||  || sko (jt)|| Ugoku na oba made. Da ∼ hant fdk! Haste ∼ sebja na mora. 
|-
| kjanas||  || sko (jt)|| Ugoku fras ejn glosa kara na andere glosa made, pr fﬆo ine andere glose. Danaj ∼ Vjosa! ∼djin pr Anglosa. Mogevjosadjin dua lid ∼.
|-
| kjoka||  || sko|| Anta uslova pr suru jt. Kjoning, dabite ∼ sada ejn hengest pr skoj.
|-
| kjome|| i|| lko|| S. cumara.
|-
| kjomuske1 ||  || sko (jt os jd)|| Suru, ke afta os sore ziha, naj vrasena, ke afta bra, ke sore zdorva. Feridjin zoll ∼ mitrjo. Dabite ∼ zdorva fdk!
|-
| kjomuske2 ||  || tko|| Ting ke kjomuske. Grenza har paksu ∼ inekras fu afta. ∼ au herus.
|-
| kjoning||  || tko|| Atamadjin fu lant.
|-
| kjure||  = trasak|| ||
|-
| klane||  || tko|| Joku ataj fu ting os pasun ke feﬆaena mit joku impla. Djin∼. ∼ fu vjosadjin. Lant∼.
|-
| klar||  = kliar|| ||
|-
| klea||  || tko|| Tragena ting. Helena ∼. Na imadah o tolka dake inn vapa ∼. O dua onalik ∼.
|-
| kletka||  || tko|| Rum, ke mahaena fu baum, erkat, os a. kara mit ahare plas ine tumam pr darma jd. Stor ∼.
|-
| kliar|| klar|| lko|| Harenanaj varge; dekiena seena bides; k. to. ∼ mada. ∼ iske. 
|-
| klinje||  || tko|| Qisaj kaban pr glug iskelik. Duaena ∼ fun. ∼ fu kuofe. 
|-
| klutch|| klut, susi, yabe, szavi|| tko|| Du deki auke dvera mit ~. 
|-
| [[kotobanen#kn-|kn-]] || || || kundur
|-
| ko||  || hobitko|| S. kotaba. 
|-
| kodr||  || lko|| Hell qigau. Vapa ∼ samuj. 
|-
| kofe||  || lko|| Fu varge, ke visk fu rju au midore. ∼ kuofe.
|-
| koj||  || tko|| 1. Zan kuqi kara ke maha fras. 2. Zan fu joku pasun kuqi kara. Bra li pas bruk ∼ ine ring. O viha ∼ fun.
|-
| kojlara||  || tko|| Brukting pr namena iskelik au santlik namting. Jerkat ∼.
|-
| [[kokoro|kokara]] || kokoro || tko|| Sluca, ajsa, impla ine hjerne au ker fu pasun. Asa na mora, srej radi bra ∼, sada hanasu. Li jam trist ∼, vill jam sljozy, men naj jam! O fsto ke afta naj apu un har plusbra ∼, men hata o suru.
|-
| kola ||  || sko|| E ine sluca (snana na naht), koske netopa au hjerne reforma, me kiniena, hell netopa pusoj, au hjerne sada apar sirusma krajsvelt kara; k. asa. Bra∼sta! O naj deke ∼ na dannaht. Skola varuj pr ∼. ∼sta un ende davaj blin. 
|-
| komoske||  || tko/sko|| 
|-
| kompju||  || tko|| Ting ke deke ugoku au kavare moge sirusma pr suru zeerga. Nea ∼. Ima ∼ treng pr moge ergasma.
|-
| kompjuglossa|| || || Python, Haskell, C, C++ auau ~ est. Python telkyannosena glossa est au C helkiannosena glossa est. zekiannosting (cpython) f paithon kakena ine c est.
|-
| koni || || || Hanuena koske se mit jd. ttb mit mik  
|-
| korokoro||  || lko? || kokoro ka joklik baraban fu ker.
|-
| [[netopa|korva]] || porva|| tko|| Tell fu netopa ine mige au leva fu akama, ke brukena pr hir. Ni ∼.
|-
| koske||  || trko|| Na ka tid. Vi ring ∼?
|-
| [[kot|kot]] ||  || tko|| Qisaj njuantaena djor, ke no mys.
|-
| kotaba||  || tko|| Tell fu glosa, ke brukena pr namae ting, pasun, surusma, impla, auauau. ∼zusevom. Joku∼. Jam 827 ∼ ine afta ∼libre. 
|-
| kotabalibre|| kotobalibre, kotoli, kotobalibr  || tko|| Libre, ke har all os plusmoge kotoba ke brukena ine glosa, doka sirusma cuj afta kotaba. 
|-
| [[kotobanen|kotabanen]] || || || Kotobanen, ke auen haisa festako, tshisai zam os kotoba ka nasijena hadji os owari fu andr kotoba per grun kawari os plus imifusore.
|-
| kotoli||  = kotabalibre|| ||
|-
| koza||  || tko|| Ting melan ineplas au ekseplas. ∼ fu fraut. Djin∼. 
|-
| kova||  || tko|| ogoe hanu. 
|-
| [[Craıs|krajs]] ||  || tko|| Ting iten uk, koza fu ke sama prara melan kara. Pica ∼ena e.
|-
| krajsret|| ||tko || Ting ke jalakasi maha au bruk per etuni ander bage.
|-
| kreu || || sko || lik balmjong
|-
| krig||  || tko|| Kondrskojsma fu djin os djinklane; k. hejva. Vi har ∼ na mogetid. Stor ∼. ∼ fu velt. 
|-
| kriz||  || lko|| Dekiena varuj pr vona os zdorva; k. ziha. Tua baumklane ∼. 
|-
| krungut||  || sko|| s. gunro 
|-
| kuha || kunje, kuhnja1 || sko || Maha namting. Goreng je kuha ale, kuha ňe al goreng.
|-
| kuhnja2||  || tko|| plas fu maha namting
|-
| kui || || || sama "fu dekk"
|-
| kulkok||  || sko|| Ugoku namting os iskelik kuqi kara na malge made mit gorla. Hanu za ∼.
|-
| kuma||  || tko|| Stor sira fuwa ting ine sinijplas ke mahaena iske kara. ∼lik pagoda. Ejn ∼ oba sinijplas.
|-
| [[kun|kun]] ||  || tko|| Fall fu pasun ke akote mjes au ona, os qigau. Jam ∼ plusmoge ni. ∼ moge deza.
|-
| kunele||  = kanele|| ||
|-
| kungca||  = sucu|| ||
|-
| [[kofe|kuofe]] || kofe, kafe2 || tko|| Kofe iskelik ke anta zeus na pasun made. Branjulik ∼. Mogedjin glug ∼ na all mora. 
|-
| [[netopa|kuqi]] || kuchi|| tko|| Tell fu netopa ke brukena pr no, glug, and hanu. Da kine ∼ koske no. 
|-
| kura||  || lko|| Fu varge fu naj harena kirkas1 ; harena nill varge; k. sira. Cesu spill doka ∼ boneka suru krig na sira boneka made. ∼ naht. 
|-
| kurica|| tore|| tko|| Fogell ine nuncan, ke deke tolka apar ljeta au anta jajco pr pasun namena. 
|-
| kusipa||  || lko (cuj jd)|| Hanuena varuj os ike; k. hofle. ∼ pasun. 
|-
| kvam||  || tko|| Bra kokara akote jd; verisma pr jd; miksma. Hata fami fun hanu ke kriz, o har bra ∼ pr mik fun, sit o vill skoj.
|-
| [[tidcher|kvell]] || kvel|| tko|| Tell fu tid melan dag au naht. O avare alting ke o suru na ∼ snana de kola. Tabun ivaj na ∼?
|-
| kytsysta||  || tko|| (stuphel ds. tufel) 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== L ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| lagom||  || trko|| Naj obamoge os unamoge, pravda ataj. O naj udaqi ∼. Naj jam ∼ gelt pr nea denva. 
|-
| lake|| i|| sko|| Deke, grun ruru, vilsma, sall, sluca, auauau. O naj ∼ hanu ima. Li dk vill, sit ∼. O inona, ke o ∼ tula, men naj siru ∼. 
|-
| lant||  || tko|| Plas, djinklane vona doka grun sama jevaltdjin, sama glosa, sama vime. Ang∼. Nihon∼. Plusplusbra ∼ Vi∼ ti.
|-
| [[kotobanen#-djin,_-lant|-lant]] || || || Aparliikimi na -djin, men per lant au plas au nai pashuun. 
|-
| lapse|| i|| tko|| Pasun za vava de atona. ∼tid vikte pr vona fu pas. 
|-
| lasa||  || || k. festa
|-
| [[lasku|lasku]] ||  || tko|| 1. Ataj, numbra, ejn, ni, tre, auauau. 2. Risa ke imi tua. Jam stor ∼ fu klinje ine vove fun. ∼ fdk haste pr lesa. 
|-
| laulu||  || sko|| Kojlid. Soll kirkas, fogell ∼. Dk ∼ tk helena!
|-
| lecte||  || lko|| 1. Plusplusbra. 2. Plusplus. Duaddjin fun ∼ e! O dua latinkakutropas men tua naj ∼ pr gavor fun. O vill ke vonafdu bli ∼bra na all vilena. 
|-
| lehte|| i|| tko|| 1. Qisaj hasaj mirdore ting, ke rupne oba vetka fu baum. 2. Ejn tell fu papere. Baum har ∼ na soltid, de tua spar gen. O naj dua lesa libre ke har moge ∼. 
|-
| lehtitid||  || tko|| 1. Ejn fu kere tell fu tosi melan soltid au upaﬆid, sama 9s—11s muaj. 2. Tell fu tosi melan soltid au upaﬆid, koske lehte bri portugale au rju au spar una, pagoda plussamuj bli. ∼ moge helena perun. 
|-
| lena||  = rum|| ||
|-
| lensi||  || sko (jt)|| Lera grun suru afta gen au gen. Du ∼ we skoj ine avto? O maladec au ∼ vere pr afta! Zoll ∼ Dojcosa.
|-
| lepa || || tko || kuchitel
|-
| lera||  || sko (jt)|| Sada sirusma, dekisma, hisfull, pofﬆo, auauau; apeta sebja. O ∼ dan, denva hur bruk. Vi ∼moge nea ko moge glosa kara grun Vjosa. O er∼ ke sorr una na un madd dan. 
|-
| lesa|| leisa || sko (jt)|| 1. Fﬆo fras ke kakuena. 2. Hanu kakuena fras. O dua libri∼ena. 
|-
| leta|| sapun|| sko|| Skoj oba luft. Fogell djijuena grun sore dekk ∼. O naj vill ke dk ∼ na hir made.
|-
| letavto||  || tko|| Avto, deke ke leta. Lake ∼ fu Russlant ine Evropa made leta ima.
|-
| lestse || leste, letse || || ds. lestse-
|-
| [[kotobanen#lestse-|lestse-]] || leste-, letse- || || Lestse<kotoba> imi plus na <kotoba> na al andr ting
|-
| leva||  || lko|| Strela, doka ker fu plusmoge djinnetopa; k. mige. Davaj skoj na ∼ madd.
|-
| li||  || tlko|| 1. Brukena pr hanu cuj gvirnaj sluca au ka gluca grun. 2. Akote sentaku jt. ∼ dk lera Vjosa, sit dk fsto Vjosa miraj. Brati ∼ sore naj siru de o sinu. Kjomiti ∼ bruk kirajn djabdell lasku. Naj siru ∼ vill mura os sta pr moranam 
|-
| libre|| i|| tko|| Joku ataj fu feﬆaena papere mit kotaba. Bra ∼. Afta ∼ naj bra lik gamel∼, ∼ ke all leradjin lesa ine skola. 
|-
| lid||  || sko|| Maha musyk mit kuqi os musykbrukting. ∼djin. O dua ∼ ine dusa. 
|-
| liht||  || lko|| Proﬆa pr ugoku; k. veht. Pero plus∼ isi.
|-
| lik1 ||  || lko|| Naj hell sama; apar qigau. Rusiosa, Ukrainosa, au Belarusiosa lik glosa e.
|-
| [[kotobanen#-liik,_-sama|…lik2]] || liik, lich || avariko|| Akote harena impla fu afta, eena lik afta. Vjosa moge evropaosalik. All djor e kot∼. Isi∼ koza.
|-
| …lik3 ||  || avariko|| Akote klane fu ting, ke afta kara. Iske∼. O moge dua nju∼.
|-
| limon||  || tko|| Kira sjor fraut mit isiliknen branjoj koza.
|-
| logika|| || ||
|-
| [[kotobanen#-tsa,_-lon|-lon]] || || || Kundr -tsa -- "un vil afto ting sluchanai".
|-
| long||  || prko|| Eena oba tell fu jt, e feﬆaena. Jam ni hant au ni jalaka ∼ netopa fu pasun. 
|-
| luba||  || lko|| Mikava.
|-
| luft||  || tko|| Kliar iskelik ke koza oba Gaja e, pr hene. Sodjiena ∼ ine nuncan. 
|-
| lule||  || tko|| S. bluma.
|-
| luna||  || tko|| Mjahveltnen ke skoj ine krajs fu Gaja. Na aftadah, ∼ stor au krajslik.
|-
| [[lupo|lupa]]|| lupo || tko|| Hujnlik djor le vona ine klane au srej una luna.
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== M ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ma- || || ||sama mange/moge
|-
| mada||  || tko|| Aharesma ine tumam fu vove os ugokuting pr sada kirkas au luft, snana kerejk. Vove fun har moge stor ∼. Mje tua helena.
|-
| made|| ad  || prko|| Imi fu ugokuena pluspluspara jt; k. kara. Prosta hanu na aldjing ∼, ke du vill ring au da hadji! Brasta na du lera cesu ∼! O zoll skoj na dusa ∼ ima. Du skoj na doka ∼?
|-
| [[kotobanen#-kara,_-made|-made]] || || || ds. made
|-
| magazin||  = butiga|| ||
|-
| maha|| maxa, mah || sko (jt)|| Suru tk ke nea ting erbli. O ∼ afta kotoli na pitka tid. Vjosadjin ∼ moge nea ko.
|-
| mahaklar||  || sko (jt na jd made)|| Apu sore pr fﬆo afta; anta imi fu afta. Naj deke ∼ afta, tk trela.
|-
| majaka||  || tko|| Maredjor mit kase jalaka. Mje pas, ke ∼ moge svinur.
|-
| majkrafon||  || tko|| Ting pr kaku zan na kampju made os ugoku zan bides zeplas. ∼ fun varuj sit zan varuj, gomen.
|-
| makipot || || sko || [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| maladec||  || lko (cuj jd)|| Ke suru bra, suru bra erga. ∼ mikdaj. O moge ∼ grun suru moge skolaerga! 
|-
| malge|| mauge|| tko|| Tell fu netopa ine, ke maha zeus fu namting au iske kara. Ahare ∼. 
|-
| maloda||  || lko (cuj jd)|| Naj gamell. ∼ pasun. 
|-
|[[fami|mama]]
|
|tko
|mama au papa ryoshin est. Pashun fu onnakun
|-
| mamaglosa||  || tko|| Glosa ke pasun siru na lapsetid kara. ∼ fun Rusiosa men o aven hanu Anglosa.
|-
| mare||  = more|| ||
|-
| marozena||  = hiven|| ||
|-
| matetun||  || tko|| Nojta melan ni os plusmoge zajudjin. Deke jam ∼ melan mikava pasun.
|-
| [[netopa|me]] ||  || tko|| Ni tell fu netopa long kava ke brukena pr se. Tristiske spar ∼ fun kara. 
|-
| melan1 ||  || lko|| Eena sama prara fu ni os plusmoge ting. O ima inn ∼ fu libre!
|-
| melan2 ||  || prko|| 1. Akote ting ke ine joku plas ejn ting kara na andere ting made. 2. Akote ni os plus ting ke feﬆaena. Evropa ∼ Amerikalant au Rusilant. Bra li jam fuwafuwa nojta ∼ pasun. 
|-
| melan3|| melon, =serkat|| ||
|-
| Melanosa||  || tko|| Gavor fu Vjosa ke pluslik all andere gavor. Nildjin hanu ∼ grun all har gavor fu sebja.
|-
| men||  || mitko|| Brukena pr feﬆa fraﬆell ke kodr os qigau; s. hata. O zoll kola, ∼ naj deke ima… O mus skeksa, ∼ o gentula gentula na apartid miraj! 
|-
| mena||  || mitko|| S. men.
|-
| menen||  || tko|| Mura ke rupne ine pitka kaban.
|-
| [[kotobanen#-mente|-mente]] || || || mah troko liikko kara
|-
| mestari||  || tko|| 1. yokdzsin ka mange bra na suru yokting, sziru al oba to ting. 2. ting lik ataideki. mestariatai fu glossa auau. 
|-
| mi||  || tko|| Qisaj sira mura ke rupne ine iske.
|-
| midore|| i|| lko|| Fu varge fu fere melan kira au sinij. Djeza moge dua ∼.
|-
| mige|| i|| lko|| Strela k. leva. Plusmogedjin bruk ∼ hant pr suru. ∼ naj sama pravda!
|-
| mik||  || tko|| Pasun ke feﬆa mit verisma, zajusma, sama cumarasma. Trengena ∼ pr aldjin. O aven vill fina plusmoge ∼djin, men tk haste fina feridjin hir.
|-
| [[kotobanen#mi--va|mi--va]] || || || mikava; ka du vil; al deki, men mono ein. ttb: "du deki nam miringova" sama "du deki nam mikava ringo" — imi "al ringo deki namena na du, men du nammir mono ein ringo" os "du deki nam ringo ka du vil."
|-
| mikava || || || ds. mi--va
|-
| miksma||  || tko|| Nojta melan ni os plus mik.  maha miksma bli mik mit jd. Jam djiong ∼ melan nas.
|-
| milenial||  = vojfraut|| ||
|-
| milita|| melita || tko|| Kirakura bazi ke maha militasjot fu bluma kara. 
|-
| militasjot||melitasjot, myalt || tko|| Sjot hidas kira iskelik, milita maha ke. 
|-
| milsan||  || tko|| Sjot namtingnen.
|-
| milu || || sko || kundur fina. Vasu ri kotoba/namaj/imi/auauau. Milu ri (ting ke jena na gviir)/(ting du har)/(gajashtòph/jenashtòph).
|-
| minus1 ||  || trko|| K. plus1 .
|-
| minus2 …||  || hadjiko|| K. plus2 .
|-
| minus3 ||  || tlko|| K. plus3 .
|-
| mipe||  = nipe|| ||
|-
| miraj1 ||  || tko|| Alting ke dekk sluca os sluca za ima. Inona ke ∼ plusbra.
|-
| miraj2 ||  || tlko (ine avare fu plas)|| Brukena pr hanu cuj sluca na miraj. Damite suru, ke hjerne fdu bli plusbra ∼!
|-
| miraj3 ||  || sko|| E miraj. O ∼ suruk.
|-
| [[kotobanen#-dan,_-ima,_-mirai|-mirai]] || || || Snjano brukena suruko per. Imi sebja.
|-
| mit||  || mitko|| 1. Brukena. 2. Harena. 3. Au. Pas dekk hanu tk, pas dekk hanu ∼ andere tropas avn. Du lake hanu ∼ mikava tropas. Pasun dekk hanu ∼ kuqi os hant. Jam jokudjin ∼ stift? Libre ∼ stor kirajn pr prosta lesa. O ∼ dk zoll hanu na plusmogetid. 
|-
| mitrjo||  || trko|| Mit jd. Davaj ∼ skoj! 
|-
| mitskoj||  || sko|| E na sama plas pr hanasu, maha miksma. Inona sore har bra ∼sma. 
|-
| mitzam||  || tko (glos.)|| Zan fu koj mahaena mit jamete fu luftnaruga, ttb. p, b, n, s 
|-
| mi…va||  || krajsko|| Naj vikteena ke. ∼ka∼ bra ti! Ka pasun vill dk? ∼dare∼ li sorr erga.
|-
| mjac|| mjah|| tko|| Treabad krajs. 
|-
| mjah||  = mjac|| ||
|-
| mjahvelt||  || tko|| Moge ﬆor mjahlik ting ine avara ke skoj ine krajs fu zvezda. Mjeta dan ke nin ∼ ine zvezdaklane fuvi.
|-
| mje||  || tlko|| Brukena de mjetaena; tabun. ∼, Rusiosa naj tk bra glosa.
|-
| mjepje||  || tko|| Ejn tell fu mjetasma. Jam ∼ akote un dan, ke lakiti kakuspill.
|-
| mjes|| mies || tko|| Pasun fu ejn kun fu ni jevalt kun; ds. ona.
|-
| [[Faerie#Mieszaju_au_onnazaju_(samakunzaju)|mjeszaju]] || || || ~ imi mies ka zaju andr mies
|-
| mjeta||  || sko|| 1. Bruk hjerne, maha nea mjepje au sirusma. 2. Har halajsasma cuj jt. Moge ∼ cuj afta haste isajka. O ∼ ke kakutropas zoll e mogemoge simpell pr lesaena. O ∼ ke all risa fdk helena.
|-
| mjude||  || lko|| Vilena kola. Afta dag tk pitka dan, ∼.
|-
| mlov||  || tko|| Brukting pr maha musyk. Dekk o tolka ejn ∼ bruk. mnevjaf ranja.
|-
| moge1 || mange, magje || lko|| Fu ﬆor ataj; naj apar. O kaupa ∼ rega magazin kara dan. ∼djin hanu Anglosa.
|-
| moge2 || mange, magje || trko|| Harena plusﬆor impla; naj apar. Sore ∼ djiong. O ∼ bystra lera pr avare fu skola. Hall fun ahare, o ∼ trela.
|-
| mokre|| moekri, i|| lko|| Harena iske oba koza os ine. ∼ sant bra pr zusevom santhuome. O ende ∼ za dusa. 
|-
| mona|| mono|| trko|| Na ejn rz; naj suruena andere ting; s. tolka2 . Dk lera ∼ ejn glosa ima? 
|-
| montann|| montan|| tko|| S. fjall.
|-
| [[tidcher|mora]] ||  || tko|| Tell fu tid zanen solsintua. ∼namena. Duadaj hir lidsma fu fogell na ∼. 
|-
| more||  || tko|| Moge ﬆor plas fu iske. 
|-
| [[tidcher#Mwai|muaj]] || mwai || tko|| Tell fu tid sama 28–31 dag os 1 fu 12 fu tosi. Ejn ∼ tk bystra skoj kara. 
|-
| mun||  || tko|| Qisaj rupneting, rupne ke oba all gajakoza. Duwa wo ine ∼ ilta.
|-
| mura||  || tko|| Pje fu joku rupneting ke namena. O no ∼ na all mora. 
|-
| murasake|| i|| lko|| Fu varge fu fere ine fura fu blau; fu varge ke visksma fu blau au rju. 
|-
| mure|| humba|| sko|| K. ing. 
|-
| muro||  || tko|| fall fu namting. 
|-
| mus||  || sko|| Treng au vikte pr suru; catajn sluca. Kava fdk moge kavaj,sir koj avn stakar ∼. All djor glug iske ∼. 
|-
| musyk||  || tko|| Helena koj os zan, os rjoha, ke mahaena inn catajn tropas. ∼ tk lik tajka. 
|-
| mys||  || tko|| Qisaj njuantaena djor ke vona akote pasun au no mura. 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== N ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| …n||  || avariko|| S. nen. Kicune∼. 
|-
| na||  || prko|| Akote tid. E moge varuj ting ∼ dan. Sore moge glau na erga. 
|-
| [[kotobanen#-na|-na]] || || || 1. Ejn raz fu suru. 2. Maxa suruko na tingo.
|-
| nafa||  || tko|| 1. Varuj udaqi. 2. Varuj tajka. 
|-
| [[tidcher|naht]] ||  || tko|| Tell fu tid melan solsinu au solsintua, os melan kvell au mora; k. dag (ine 2s imi). Zoll kola na ∼. 
|-
| naj1 || nai, ne, nej  || tlko|| 1. Svar fu naj uslova; k. akurat. 2. Brukena pr maha qigau os kodr imi fu kotaba ine fura fu afta. Vill rega? ∼, ∼ ima. O vill lera mit sebjatropas, o ∼ dekk suvaru ine sama plas na hantre djikan, zoll jam ugoku! O zoll kola, men ∼ deke ima. 
|-
| [[kotobanen#-nai|…naj2]] || nai || avariko (fu likko/suruko/tingko)|| Brukena pr maha kodr imi. Qisaj sama stor∼. 
|-
| naku||  || sko|| Ra iskelik me kara, grun ﬆor kokara, snana triﬆ os glau. O na niltid ∼ dan, hata vill.
|-
| na…made||  || krajsko|| Ds. made.
|-
| namae1 ||  || tko|| Kotaba os frasnen ke brukena pr ﬆrela na ejn catajn ting os pasun made. Na apartid haste sentaku ∼ pr sebja akote kavarikundjin. ∼ fun Ker.
|-
| namae2 ||  || sko (jt os jd)|| Anta namae na afta os sore made. Dk ende siru hur ∼ nea kot?
|-
| namaenen||  || tko|| Atamanaj namae fu pasun.
|-
| [[namting|namting]] || || || Namting je ting ke namdekijena na pashun.
|-
| nana||  || tko|| Lasku melan ekse au kase; 7.
|-
| naruga||  || tko|| Hosaj pitka plas, jt os jd skoj oba ke. Iske∼. ∼ na skola made moge pitka. 
|-
| nas||  = vi|| ||
|-
| naze1 ||  || trko|| Ka grun. Dk ∼ suru afta? 
|-
| naze2 || i|| sko (jt)|| Suru, ke afta plusmoge; sjan; k. ra. Lakk ∼ iske ine klinje fun bite?
|-
| neja||  || lko (snana cuj ting)|| Naj gamell. ∼djin. ∼ko. O ende har ∼ denva. 
|-
| nejadjin||  || tko|| Namaenen fu pasun ine Vjosadiskordserver ke hadji lera Vjosa na paratid. Dan moge ∼ za Misalidjinvideo. 
|-
| …nen||  || avariko|| 1. Qisaj. 2. Suru, ke impla fu atamakotaba plusqisaj os plussvanc os pluskavaj. Klinje∼. Dekk suru apar∼.
|-
| neomwai || noimuai, 1smwai || || sama "eins mwai"
|-
| [[netopa]] ||  || tko|| 1. All tell fu joku vonating. 2. Tell fu netopa ke melan, ine ke ker. ∼zusevom. 
|-
| ngoro||  || || gammeldjin: lapsingoro vi nai har dan aftó "opetaklupau" 
|-
| ni||  || tko|| Lasku melan ejn au tre; 2.
|-
| niabad||  || lko|| Harenanaj fansuka piktajena os hosajena. ∼ papere. ∼ gaja. 
|-
| niles||  || tlko|| Hofle svarsma za danke. 
|-
| nill1 || nil|| lko|| Ke naj harena, itn; k. all1 . Jam ∼ gelt ima. No alting, siru ∼ting. 
|-
| nill2 || nil|| tko|| Lasku ine hina fu ejn; lasku fu nill ataj. 
|-
| nin||  || tko|| Lasku melan kase au den; 9.
|-
| nintenda||  || lko|| Antaena flire kokara. 
|-
| nipe|| mipe|| tko|| Pasun ke har sama rujqin mit andere pasun; ds. brur, siska. Sore har mogemoge ∼!
|-
| niqista||  || lko|| Eena haﬆe pr seena; k. helena.
|-
| njoj1 ||  || tko|| Dekisejenanaj impla fu ting au pasun, hana fﬆo e. Bra ∼ namting kara. Hejn fdk har moge varuj ∼! 
|-
| njoj2 ||  || sko (jt)|| Ajsa njoj mit hana. Da ∼ afta bluma! 
|-
| nju||  || tko|| 1. Sira iskelik, joku ona djor anta pr lapse glug. 2. Sama iskelik fu pasun. Vapa ∼. 
|-
| no1|| nam|| sko (jt)|| Suru tk, ke sada zeus afta kara mit kuqi au malge. ∼ mura. Skoj pr har ∼ting dan. 
|-
| no2||  nuh, nu|| || "lik uhhh.." 
|-
| [[kotobanen#-fu-,_-no-|-no]] || || || maha likko. festakotoba -no maha andere kotoba iň likotoba. Samaimi fujena. Tatoeba, unno ringo imi "afto ringo ka un har".
|-
| nojta||  || tko|| Feﬆating; naruga melan ni os plusni ting; ting ke suru, ke ni os plusni ting ejn e. Jam bra ∼ melan sore ni. ∼ svanc ine afta libre e 
|-
| nor||  || tko|| Poneting ke rupne joku djoratama kara. Plusmoge djor har ni ∼.
|-
| nort||  || tko|| Strela fu velt ke ine leva fu pasun ke se na iﬆ made; ine migi fu pasun ke se na veﬆ made; k. sut.
|-
| ns||  || hobitko|| Naj siru.
|-
| nui || || || sama "fu un"
|-
| nuncan||  || tko|| Plas doka rupne djor au ruti grun pasun. 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== O ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| [[Un (kotoba)|o]] || un|| pko|| Pasun, ke hanu; hanasudjin. ∼ moge dua afta bluma. Dk zaju we ∼? 
|-
| oba1 ||  || prko|| 1. Pluspitka ine sama plas; k. una 2. Cuj, akote, para, made, ine. Libre ∼ isu e. Tk helena se ∼ lant luftavto kara. Du dekk se ka ∼ ekran? 
|-
| [[kotobanen#oba-/ob-/o-,_unna-|oba2 …]] ||  || hadjiko|| Naj lagom, grun plusmoge; plussat; k. una. Jam ∼moge libre pr lesa all. 
|-
| oca|| ocha, chai?|| tko|| Iskelik ke mahaena fu catajn joku rupneting kara ine vapa iske. Mik fun maha moge bra ∼. 
|-
| ogoe||  || lko (cuj zan)|| Stor os djion; proﬆa pr hirena; k. pinona. Sore har ∼ koj. 
|-
| ojsi|| oishi|| lko|| Harena bra smak. Tk ∼daj! 
|-
| on||  || tko|| Pasun ke naj har netopa, naj deke se ke; sall fu pasun ke dekk ugoku itn netopa. Acorlik ∼. 
|-
| ona|| onna || tko|| Pasun fu ejn kun fu ni jevalt kun; ds. mjes. Seena tk moge helena ∼netopa au ∼kava ine Reddit anta moge tristsma na un made.
|-
| [[Faerie#Mieszaju_au_onnazaju_(samakunzaju)|onazaju]] || onnazaju || || onnazaju imi onna ka zaju andr onna. 
|-
| os||  || mitko|| Brukena pr feﬆa fraﬆell ke qigau, li mus sentaky ejn. Plusdua rega ∼ banan? 
|-
| …osa||  || avariko|| Glosa. Vj∼. Rusi∼. Plusplusduaena glosa fun Ang∼.
|-
| ostre|| i|| lko|| Dekiena simpell cer jt; k. dujn. ∼ ajsta.
|-
| ostridjor||  || tko|| Myslik djor mit oﬆriting oba afta. ∼ naj kriz.
|-
|oum
|
|sko
|koske gormoi bli pluchisai. Ttb. Kuchi fu lapsi razhau au raz~ koske sore nam. Megormoi fu un ~ koske un se kirkas" k. hau
|-
| ovasi||  || tko|| Joku rupneting ke brukena pr no au mahaena ine nuncan. O moge dua smak fu ∼. Jokudjin naj no sjot, tolka ∼. baum au lule ti ruti, men nai mus ovosi.
|-
| -oze || || || lik maha-, men naj sama.  un mje ke... -oze maha likko, men maha suruko
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== P ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| paborte||  || sko (jt)|| Suru tajna. O da ∼ sall fun na pitka tid dan.
|-
| padez||  || tko|| Kavarisma fu kotaba ine joku sluca ine gavor. Jam ∼ ine kanutropas fun. Qisaj kurica sama torinen.
|-
| pagoda||  || tko|| Impla fu luft au sinijplas ine catajn plas. Angdjin dua cuj ∼ hanu. ∼ samuj na aftatid. 
|-
| paksu|| pasku|| lko|| Eena plusﬆor ine hobit plas; k. hosaj. ∼ libre. 
|-
| pall1 || pal|| sko|| It sebja na luft made mit jalaka. Kanele bra ∼ dekk. 
|-
| pall2 || pal|| sko|| Skoj iltaena para gaja. Djarper tolka ∼ dekk. Jam tk apar zeus, o ∼ nahuomimada dan.
|-
| palto||  || tko|| Klea pr oba fu netopa ke bra pr samuj pagoda. Helena ∼. 
|-
| pamadora||  || tko|| Rju sjot fuwa ovasi.
|-
| pampe|| i|| lko|| Eena ine bra, qisaj, pinona asme; k. baja. Tua pasun moge ∼. Haste ∼ e li mogedjin vill pas vras. 
|-
| [[pan]] ||  || tko|| Namting ke mahaena fu santena mura kara ine vapabaksu, ke fuwa ine au mit isilik koza. Fuwa ∼ 
|-
|[[fami|papa]]
|
|tko
|mama au papa ryoshin est. Pashun fu mieskun
|-
| papere|| i|| tko|| Moge hosaj lehte ke mahaena fu baum kara, brukena pr kaku. O dua risa oba ∼. 
|-
| para||  || trko|| Ine akote plas; k. prara. Jam papere ∼? Dk skoj we ∼ butiga? 
|-
| parjan||  || tko|| Klane fu ting, ine ke all ting har catajn pravda plas; k. visksma, sajlunn. Alfarun ∼ fu kirajn e. ∼ fu pasun.
|-
| partugale|| i|| lko|| Fu varge fu fere melan rju au kira. 
|-
| pas||  || pko|| 1. Aldjin. 2. Joku pasun; midareva. ∼ mus no pr vona. Koske ∼ lera Vjosa, ∼ zoll naj kjanas. 
|-
| pasmurna||  || tko|| Pagoda, koske naj deke se sol grun kuma oba all sinijplas. Naj vill o jingsaj na aftadah grun ∼.
|-
| [[Pashun|pasun]] || pashun, djin|| tko|| Vonating ke deke lectebra mjeta, ke siru ke sore e. ∼ har ni jalaka, ni hant, au go jube long tua. 
|-
| pelmeni||  || tko|| Namting fu sjot kara ine koza fu pan kara, ke mahaena ine vapa iske. 
|-
| pero||  || tko|| Pitka ting ke rupne koza fu fogell kara; har fu fogell. Bruk ∼ pr kaku oba papere dan. 
|-
| perpa||  || sko (jt)|| Suru, ke afta naj dvajbma; l. vras. Dk ∼ we denva fdk? ∼ mada mit mjac. 
|-
| perun||  = pr un|| ||
|-
| pica||  || tko|| Namting ke mahajena fu sjot au ovasi kara oba hosaj niabad krajsena pan. 
|-
| [[pidjin]]||  || tko|| Fall fu glosa ke sluca, koske ni os plus djinklane mit qigau glosa mus hanu mitrjo. 
|-
| pik||  || tko|| Moge qisaj krajslik ting. Zvezda ∼ e Gaja kara. 
|-
| piman||  || lko|| Fu djiong vapa smak. ∼ sta. 
|-
| pinona||  || lko (cuj zan)|| Qisaj os svanc; haﬆe pr hirena; k. ogoe. Mys moge ∼, tk haste fina. ∼ koj. 
|-
| pipa||  || tko|| Klea pr kragena oba akama; s. fedora. Duajena ∼. 
|-
| pissa||  || sko|| 
|-
| pitka||  || lko|| Eena plusﬆor ine hosaj plas; k. hobit. ∼ fjall. ∼ baum. Mje ∼ pasun moge helena. 
|-
| pje||  || tko|| Qisaj santlik ting, ke sintua rupneting. ∼ fu pamadora. 
|-
| plas||  || tko|| Joku tell fu abad; ting deke e doka. Jam moge heleha ∼ ine lant fun. 
|-
| plus1 ||  || trko|| 1. Na moge tid hata naj tk moge dan. 2. Gen. Vi pravda zoll lensi Dojcosa ∼. O no ∼ miraj. Li na ejns rz pas naj ing, zoll iskat ∼. 
|-
| plus2 …||  || hadjiko|| 1. Harena ﬆor impla hata snana naj tk ﬆor. 2. Harena ﬆor impla hata andere naj tk ﬆor. Ima jam ∼moge rega ine magazin. Afta baum ∼bysta rupne tua baum.
|-
| plus3 ||  || tlko|| Ds. plus2 . Vill we ni kojlara fu sjot os ∼?
|-
| plusplus…||  || hadjiko|| Plusﬆor impla all andere; lecte. ∼djiong pasun avn moge pitka.
|-
| [kotobanen#po-|po…] ||  || hadjiko (mit sko)|| 1. Plusmoge ejn rz. 2. Apar. O ∼anta iske narupnetingmade. Aldjin ∼anta gavat nasintuadahdjinmade. Dk ∼hanu we mit aldjin? O ∼lensi Dojcosa na aftadah. suru ovari made. 
|-
| pocta1 ||  || tko|| Plas doka deke hanasu mit kakusma mit jokudjin ke prara. Djinsu∼. 
|-
| pocta2 ||  || sko|| Bruk pocta pr hanasu or anta ting. O ∼ hell kotoli nadkmade koske dekk.
|-
| polis||  || tko|| Stor plas, jam doka moge djinhuome au ergaplas. London stor ∼ e. Naj aldjin vill ine ∼ vona. 
|-
| poll|| pol|| tko|| Una fu vove; ds. ele. Niabad ∼. 
|-
| [[netopa|polvi]] || || || jalakatel fu djin
|-
| pone1 ||  || tko|| Sira isijena zusevomting ine all djor au pasun. Vrasena ∼.
|-
| pone2 || i|| tko|| Hengeﬆnen.
|-
| por||  || tko|| Stor djor mit ﬆor dujn nor ke vona ine samuj plas.
|-
| porva|| = korva|| ||
|-
| pr|| per, pere || prko|| 1. Radi. 2. Akote ting ke zolena suruena, dvajmajena. 3. Akote ﬆrela fu surusma. Dk suru we afta ∼ geltsada? Apeta sorr ∼ Vjosa. Jam ejn ajsta ine kuhnja ∼ cer sakana. Jam tre gavat ∼ un na aftadah! O bruk afta stift ∼ kaku, tua ∼ risa.
|-
| [[tidcher#Mwai|praanmwai]] || 3smwai || || sama "tres mwai"
|-
| [[tidcher#Toshikeretel|praanvera]] || || || Ejn toshikeretel. Mwai fu praanvera koske bluma eins rufne.
|-
| praj||  || tko|| Plas melan ni qigau ting, sanpoll, ﬆyx. Afta naruga ∼ melan vi a sore e.
|-
| prara|| prapa<br>prappa  || trko|| K. para, akote (ine 1s imi). O moge ∼ ergaplas fun. [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| pravda||  || lko|| Eena ine gvir; ke zolena; k. uso. Afta fras ∼ we? Tua ∼ varge pr afto we? Ak, mje ke sore hanu ∼ ko. 
|-
| presmi || || || ting ka jokudjin deki guso au de, snana jokuting sluca
|-
| prosta1 || simpell|| trko|| K. haﬆe. Vjosa ∼ pr lera. 
|-
| prosta2 || simpell|| lko|| 1. K. haﬆe. 2. Harena apar tell. ∼ isajka. Tokiponaosa moge ∼ glosa e.
|-
| pu|| || prko|| (tid). s. dan de; k. bi. Hanu vi ∼ ejn dag.
|-
| puan||  || tko|| Slagsma. 
|-
| pulap||  || sko (iskelik)|| Ugoku afta ejn kaban kara na andere kaban made. Dabite ∼ apar oca we? 
|-
| pulap2||  || tko|| k. ahare 
|-
| pusoj||  || lko|| Lakiena suru ting, vilena ke; k. zanjat. Vill we cuj sintuadahivaj tula? Naj ∼ miraj, grun erga, gamen. 
|-
| pusojtid||  || tko|| Tid, lake suru mikava na koske. Jam we ∼ pr spill?
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== Q ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| qi1 ||  || tko|| Mitsurusma melan ni os plus pasun os djor, ke pr nintenda os maha vava. Naj all mjes vill ∼. 
|-
| qi2 ||  || sko (jd)|| Suru qi mit sore; s. rr2 . O tolka ∼ mik fun. qibang qibas.
|-
| qibas||  || tko|| Hand mit pero, ke brukena pr leta. Har all fogell ∼, mn mibaziva avn har.
|-
| qigau|| chigau || lko|| Naj sama; harena andere impla. Tua ko har ∼ imi. Vjosa fu aldjin ∼.
|-
| qigeull|| qigeul|| sko (namting)|| Gatov afta mit vapaplas una. Sorr ∼ sjot prvi.
|-
| qip|| chip, tchip || tko|| Iskeavto. Mus ∼ os letavto pr skoj Amerika made.
|-
| qisaj|| chiisai || lko|| Eena minus; ds. nen; k. ﬆor. ∼ vava.
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== R ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| ra||  || sko (jt)|| Suru, ke afta minusmoge; k. naze2 . O ∼ apar libre baxu kara pr afta plusliht. 
|-
| radi||  || prko|| Vilena sada; vilena ke afta sluca; pr jokugrun. O lera Dojcosa ∼ deke na skola ine Dojcland made skoj miraj. Srej ∼ bra kokara. 
|-
| rafaj||  || tko|| Tell fu netopa fu djor ke rupne hina kara. Pasun naj har ∼.
|-
| -rai|| || || namrai=nam+rai=nam+mirai 
|-
| ranja|| mnevjaf, ragna|| tko|| Tell fu baum una gaja, glug ke iske. Deke pasun ∼ oba fjal se.
|-
| rause||  || sko|| Ra luft hana kara os kuqi kara; k. hene. 
|-
| rausim||  = rause|| ||
|-
| raz||  || tko|| Bazi mit kase jalaka. 
|-
| razgovor||  || tko|| 
|-
| reforma||  || sko (jt os jd)|| Suru, ke afta dvajma gen, ke sore zdorva. Da ∼ sebja bite. Dekk we ∼ denva fun? 
|-
| [[Ringo|rega]]|| ringo|| tko|| Rju, midore, os kira fraut ke rupne oba baum. Ine VDS ∼ brukena pr apeta. 
|-
| ret||  || tko|| Feﬆaena ting mahena fu nojta kara. Raz maha ∼. Ze∼. 
|-
| retoll||  || tko|| Risa, ke lik kotaba, ke anta sirusma. Zoll lera all ∼ pr skoj oba naruga ine avto.
|-
| ri||  || || "ri ringo nam te un." 
|-
| ring||  || sko (jd)|| Hanasu mit sore bides denva os kompju mit majkrafon. ∼ we vi? 
|-
| risa1 || seuk|| sko (jt)|| Bruk varge pr maha ting oba niabad plas, ke lik gvir ting pr seena. Lapse dua ∼. Dk ∼ ka? Aldjin deke ∼.
|-
| risa2 || seuk|| tko|| Ting ke za risaena. Moge helena ∼. Kompju dekk maha bra ∼. 
|-
| rjo||  = rjoha|| ||
|-
| rjoha|| rjo|| pko|| Ni; afta au afta; sure au sore. Dk vill ka rega, rju os midore? Da ∼ bitte. 
|-
| rju1 ||  || lko|| Fu varge fu fere ine hina fu partugale. 
|-
| rju2 ||  || tko|| Fig ﬆor djor ke lik atekse. 
|-
| [kotobanen#rm-|rm…] ||  || hadjiko|| S. rjoha. os ryoho made
|-
| rofaj||  || tko|| pitka shkoiting. 
|-
| rova||  || lko|| Baja, varuj, bjoze asme grun nafa os varuj sluca. Sore ∼ grun avto fsorr vrasena. 
|-
| roza||  || lko|| Fu varge ke visksma fu rju au sira. ∼ bluma
|-
| rr1 ||  || sko (jt)|| Ugoku na fura au hina made pluspluspara. Klea vrasena grun ∼. ∼sma maha vapa. Zoll po∼ ting pr bra ersodji afta.
|-
| rr2 ||  || sko|| S. qi2 .
|-
| rujqin||  || tko|| Pasun ke sintua au/os rupne lapse. Naj all ∼ bra pr lapse fsore.
|-
| rukav||  || tko|| Tell fu obaklea, hant doka. Zoll dk pitka ∼ trag pr kjomuske koza fdk sol kara.
|-
| rum|| lena|| tko|| Joku plas ine zusevomting, ke har tumam, poll, ele, dvera, aven snana mada, doka deke vona, erga au a. Vove fun har kere ∼. 
|-
| ruota1 ||  || sko|| Ra iskelik malge kara bides kuqi. O no jokuting varuj dan, de ∼. 
|-
| ruota2 || ruoruo|| tko|| Kokara fu vilena ruota. Kokara ∼ na aja. 
|-
| ruru||  || tko|| ting ka deki os nae deki suru. ting ka laki es. 
|-
| [[rupneting|ruti]] || rupneting || tko|| Rupneting. 
|-
|[[fami|ryoshin]]
|ruishin
|tko
|mama au papa sama ryoshin
|-
| ryr||  || sko|| 
|-
| rz1 ||  || trko|| Na tell fu tid melan hadji au avare fu surusma; na ejntid. � rz za rz Na moge rz. Dk tolka iskat we Vjosa lera ∼? Zoll gen iskat! O lesa afta libre na tre ∼.
|-
| [[kotobanen#raz-|rz2 …]] ||  || hadjiko|| Na moge rz. Ima ∼moge Vjosa, men treng plusmoge tid.
|-
| rz3 ||  || prko (melan ni lasku)|| Tk moge fu afta. Ni ∼ tre sama ekse.
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== S ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| [[kotobanen#-s|-s]] || || || Nasijena laskukotoba. Imi ka plas parjaad inne -- li du einsplas bistrajalakadan, du bistrajalaka plus na al andr. Li du nisplas, ein pashuun plus bistra na du, auau.
|-
| sacu||  || tko|| Klea, trag ke oba netopa. Nea ∼ tk cad!
|-
| sada||  || sko (jt jd kara)|| Erhar afta grun sore anta; k. anta. Moge glau grun ∼ gavat dk kara! 
|-
| sagak||  || sko (jt)|| Rzcer.
|-
| sajlunn|| sajlun|| lko (cuj vove)|| Harenanaj parjan; trengena sodji; k. kazif. Rum fun moge ∼, danaj madeskoj!
|-
| sajsa||  || lko|| Varuj, vilenanaj. ∼denva.
|-
| sakana||  || tko|| Djor ke vona ine iske. Jam moge ∼ ine more. 
|-
| sakare||  = karoten|| ||
|-
| salgeum||  || sko|| Skoj pinonaena. O ∼ na naht pr naj erasa pas.
|-
| sall|| hal, shal|| tko|| 1. Impla fu vona, fupas, ke ajsa, har kokara, asme, zajusma, vilsma, auauau. 2. Joku tropas fu suru jt. Jam ∼ ine aldjin. ∼ fun arka ima. Vjosa∼. 
|-
| sam||  || sko|| E long tumam. Toke ∼ tumam. Jam moge ∼ena risa ine vove fun.
|-
| sama||  || lko|| Hell lik, naj qigau.
|-
| [[faerie#Mieszaju_au_onnazaju_(samakunzaju)|samakunzaju]] || || || Mieszaju imi mies ka zaju andr mies au onnazaju imi onna ka zaju andr onna. Afto awen haisajena « faerie / feri », hoćaa MORAKA ende haisajena na to.
|-
| [[kotobanen#-liik,_-sama|-sama]] || || || ds. sama
|-
| samuj||  || lko|| Harena impla ke deke ajsa; ajsa upas kara; k. vapa. ∼ iske. ∼ hiven. 
|-
| sangju||  || tko|| Stor djor ke vona ine santplas au deke vona na pitkatid iten iske. ∼klane.
|-
| sanpoll||  || tko|| Praj melan gaja a mora mit sant. Duwa pasun oba ∼ nintenda.
|-
| sanso|| sosa|| tko|| Lidsma.
|-
| sant||  || tko|| Stor ataj fu moge qisaj isinen. ∼ena plas para mora bra e pr nintenda au pampe. ∼huome. 
|-
| sapah||  || sko (iskelik)|| Suru, ke afta skoj eksa kaban, napolmade. Danaj naku grun ∼ena nju. ∼ oca.
|-
| sapun||  = leta|| ||
|-
| sardeska|| cas|| tko|| Brukting pr bidescer namting au namena. Jam ∼ plusmoge kojlara ine kuhnja fun.
|-
| sat||  || lko|| Naj dekiena sada plus; k. ahare. ∼ klinje. Li naze plus, sapah. Hant fun ∼ e. 
|-
| sau|| tsau, tsao|| lko|| 
|-
| sayo|| || || Hanuena koske skekso os avare hanasu mit jd. 
|-
| se||  || sko (jt os jd)|| Fﬆo brukena me. O ∼ moge pasun ke bruk kirilkaku. Sore naj deke ∼. Vi ∼ bra zerisa dan.
|-
| sebja|| sja2, sa || pko|| Akote surudjin. O naj zaju ∼. 
|-
| sebjazam||  || tko (glos).|| Zan fu koj mahaena mit aukiena luftnaruga, ttb. a, e, o.
|-
| segun||  || sko|| Rzhene au rzrause. Varuj luft hir, haste pr ∼.
|-
| sen1 ||  || tko|| Pitka hasaj ein abad ting ke skojn na ejns ﬆrela. ∼ting. 
|-
| sen2 ||  || lko|| Kavarijenanaj ﬆrela; ine sen. ∼ hina bra pr zdorva. 
|-
| sentaku||  || sko (jt os jd)|| Strela na afta os sore made ke plusvilena. O ∼, ka sluca mit natopa fun.
|-
| serkat|| melan|| tko|| Ting, ine ke se sebja, snana mahajena fu glas. Sodjilik ∼.
|-
| seuk||  = risa|| ||
|-
| sevas||  || tko|| Treabad kerejk. 
|-
| [[tidcher#Mwai|shagmwai]] || 11smwai || || sama "den-ejns mwai"
|-
| si|| =ti || ||
|-
| [[kotobanen#si-|si-]] || || || 1. natsıgautsıgau os natsıgau tēl. 2. na rȷō cara
|-
| šikno|| sjiknu|| tko ||  Bom, Vind, Agro, Dir, al fu to je tel fu šikno
|-
| silo||  || tko|| Grisblau os sira fogell, vona ke ine polis. Suvaru wo oba isu a wit pan na∼made dan.
|-
| simpell||  = proﬆa|| ||
|-
| sinij||  || lko|| Fu varge fu fere melan midore au blau. 
|-
| sinijplas|| cela|| tko|| Luft oba gaja, kuma doka; s. cela. ∼ moge helena na altid. 
|-
| sinileva||  || tko|| Naruga oba iskenaruga. Duwa wo naiskemade se, koske sjan o oba ∼.
|-
| sintua||  || sko (jd)|| Suru, ke sore hadji vona. Aldjin deke sentaku li ∼ os naj. 
|-
| sinu||  || sko|| Janete vona. Sorr ∼ na dedah. 
|-
| sira||  || lko|| Fu varge fu kirkas; harena all varge fu fere mit sama ataj; k. kura. ∼ denva.
|-
| siraljok||  || tko|| Piman sira ovasi, ke mahaena fu joku hamaslik tell. ∼ suru, ke mikava namting plusbra smak har.
|-
| siru|| xiru  || sko (jt)|| Erfﬆo afto dan, har hisful akote afta, har afta ine hjerne. ∼ we afta ko? Sorr moge ∼ cuj velt. O ∼ tua pasun. 
|-
| siska||  || tko|| Nipe fu onalik kun; ds. nipe. Naj jam ∼ fun.
|-
| sit||  || mitko|| K. grun1 . Li o naj ine Dojclant, ∼ trist miraj. Lensi haste mn li dk suru, ∼ dk braonanen e. 
|-
| sja1||  || sko|| Ugoku byﬆra au pinonaena. O ∼ bides vove dan.
|-
| sja2|| = sebja|| ||
|-
| sjah||  || tko|| Pinona zan.
|-
| sjan1 ||  || sko|| 1. E ine jp itn ugoku oba jalaka. 2. E ine jp. Sore ∼ una baum. Libre ∼ ine stol.
|-
| sjan2||  = tacu|| ||
|-
|sjang
|
|sko
|sama "gira oba"
|-
| sjor||  || lko (cuj namting)|| Harena djiong smak ke lik limon. Li nju ∼, afta flan. 
|-
| sjot1 || sokere|| tko|| Santlik qisaj sira isi ke brukena pr naze sjot smak na joku namting made. ∼kaban. 
|-
| sjot2 ||  || lko (cuj namting)|| Harena bra smak lik fraut. ∼ torta. 
|-
| sjot3 ||  || tko|| Tell fu netopa fu vonating, andere vonating no ke. ∼ varuj pr pagoda. ∼ har moge bra smak. 
|-
| skeksa||  || sko|| Erskoj eksa jp. Koske sorr rzhanu cuj qi, o mus ∼ dan. 
|-
| [[Suruko|sko]] || surukotaba || tko|| hobitkotoba fu "suru + kotaba". Suruko os surukotoba har imi fu hanutel ka mahklar afto ka yoku suru--mangetid sore en pashun, plas, ting, mipje; auenose mahklar ka slucha os surjena mit joku fu he.
|-
| skoj|| shkoj, szkoi, shkoy, shkoi, skoi  || sko (na jp made)|| 1. Ugoku sebja der. 2. Jalaka der. Dk ∼ obabystra inn avto. Dabite ∼ namagazinmade. Ruti naj deke ∼. 
|-
| skola||  || tko|| Plas, doka pasun lera. ∼ fun varuj pr lapse. Moge dua lera inn pitka∼! 
|-
| skvala||  = hanga|| ||
|-
| sladke|| i|| lko (cuj jd)|| Bra, kavaj, fuwafuwa, zajuena. Dk tk ∼.
|-
| slag||  || sko (jt os jd)|| Byﬆra djiong ugoku hantnen na afta os sore made. Sore ∼ un dan! Tk arka. 
|-
| slek||  || sko|| 
|-
| sljozy||  || tko|| Iskelik ke spar mekara koske naku. Stor ∼. Spar ∼.
|-
| sluca1 ||  || sko|| E; hadji e; sintua; bli. Ka ∼ pr dk? Alting kavare sebja dan, koske tua ∼. 
|-
| sluca2 ||  || tko|| Slucasma. Sentaku fu Prezident vikte ∼ e. 
|-
| …sma||  || avariko|| Brukena pr maha tingkotaba andere kotaba kara. Suru∼. Helena∼ 
|-
| smak||  || tko|| Impla fu ting, glosa ajsa ke. Limon har sjor ∼.
|-
| sn||  || || sama "shirunai"
|-
| snana||  || tko|| Na plusmoge tid; k. ﬆrane. O naj ∼ glug kuofe. 
|-
| so1 ||  || tko|| Sira qisaj isi ke brukena pr plusbra smak. ∼ brukrna ine all namting. 
|-
| [[tidcher|so2]] ||  || tko|| Tell fu tid sama 1 fu 60 fu fun. 
|-
| sodji||  || sko (jt)|| Suru, ke afta naj temiz, naj sajlunn. ∼ sebja ine dusa. O ∼ rum fun dan. 
|-
| sodjiu||  || tko|| Kirkasena iskelik ke mahaena fu rega kara.
|-
| sojun||  || tko|| Helenasma.
|-
| soke||  || tko|| Kofe sjot namting. Aldjin dua ∼.
|-
| sokere||  = sjot1 || ||
|-
| soll|| sol|| tko|| Plusplusﬆor zvezda ine sinijplas; mjahvelt, ke anta kirkas1 , Gaja skoj ine krajs fu ke. Naj jam ∼ ine naht. 
|-
| soltid||  || tko|| 1. Ejn fu kere tell fu tosi melan blumatid au lehtitid, sama 6s–8s muaj. 2. Tell fu tosi melan blumatidau lehtitid, koske jam plusmoge soll au vapa. Vapa ∼. 
|-
| sore|| sor || pko|| Brukena pr ﬆrela najdmade, qigau hanudjin au pasun, hanudjin hanu nakemade. Li ∼ naj lera, sit ∼ baka e. O mjeta ∼ moge bradjin. 
|-
| sosa||  = sanso|| ||
|-
| spada||  = spar|| ||
|-
| spar|| spada|| sko|| Moge byﬆra skoj na una made. Klinje fun ∼ stol kara.
|-
| spill1 || spil|| sko (jt)|| 1. Sada nintendasma afta kara. 2. Maha muzyk mit musykbrukting. 3. Maha furiisu. Lakk we ∼ cesu? Sorr dua lid∼. ∼ Hamlet. 
|-
| spill2 ||  || tko|| Surusma ke dekiena spill1 (ine 1s imi). Jam moge stol∼ ine vove fun! 
|-
| [[Spør Kotoba|spure1]] || spor || sko|| Hanu fras pr sada joku sirusma anderedjin kara. Neadjin zoll ∼ moge. k. svar 
|-
| srej||  || sko|| Maha ﬆor ogoe zan kuqikara. Lupa ∼ nalunamade 
|-
| …sta1 ||  || avariko|| Vill, ke afta sluca, ke jd har afta. Bramora∼. Branaht∼. Bratula∼.
|-
| sta2 ||  || tko|| Namting mahaena fuiskemade mit ovasi au snana sjot; ds. ﬆa. Vapa ∼ pr reforma bjurkisma.
|-
| stakar||  || lko (cuj jd)|| S. kavaj.
|-
| stift|| shtijft|| tko|| Brukting pr kaku au risa. Har we ∼ perun? O vasu fun. 
|-
| stof||  || tko|| Ting, andere ting mahaena fukekara. Jerkat ∼ e. 
|-
| stol||  || tko|| Paksu ting, ke sjan oba jalaka, pr sjan andereting oba afta. Namting oba ∼ ima! 
|-
| stor||  || lko|| Eena plus; ds. daj; k. qisaj. Mys har ∼ ker. ∼ djor kriz.
|-
| strane|| i|| lko|| K. snana. ∼ pasun. ∼ sluca. 
|-
| [[Strela|strela1]] ||  || tko|| Leva, mige, oba, una, fura, hina, auauau. � strela fu velt ejn fu nort, sut,iﬆ, os veﬆ. Da o skoj na ka ∼ made? Kere ∼ fu velt. 
|-
| strela2 ||  || sko (na jt made)|| Suru radi jd se afta. Sore ∼ naunmade dan. 
|-
| styx||  || tko|| Praj melan pitka gaja au hobit gaja, deke doka spar. Jam kriz ∼ ine dasos.
|-
| sucu|| kungca|| sko|| Anta all mjetasma, djiongsma, au zeus radi jt. Moge ∼ grun afta isajka. Mus ∼ pr vona.
|-
| suha|| || sko (jt) || Iskat se pabortejena jt. Dk er∼ we jokunamting prvi? Du milu ting, du suha ting, de du finna ting.
|-
| sui || || || sama "fu sore"
|-
| sungura||  = usage|| ||
|-
| surong||  || sko|| Skoj ine iskeavto.
|-
| suru|| soro || sko (jt)|| E, maha, sluca, auauau; k. jatazahull. Sore ∼ bra ting. O vill ∼, ke aldjin har bra ting. Har tk moge zeus, vill ∼ alting! 
|-
| suruk|| curuk, zuruk|| trko|| Nahinamade. Bra∼sta! O erskoj na erga made de ∼ nahuomimade. O naj paratid ∼skoj hir. [[Zeting:suruk.jpg|50px|thumb|left|]]
|-
| sut||  || tko|| Strela fu velt ke ine mige fu pasun ke se naiﬆmade; ine leva fu pasun ke se naveﬆmade; k. nort. 
|-
| suvaru||  || sko (oba jt)|| E oba jt mit hina mit gnutiena jalaka. ∼ oba isu. 
|-
| svanc||  || lko|| K. djiong. ∼ pasun. 
|-
| svar||  || tko|| Fras za spure os isajka. Tua bra ∼. Jam we ∼ ende? 
|-
| svinja||  || tko|| Djor ine nuncan, ke rupnejena pr sjot.
|-
| svinur||  || lko (cuj jd)|| Ke siru moge; harena moge hisfull; l. hoja; k. baka. ∼ pasun. Mogedjin mjeta ke gameldjin avn ∼, hata naj na altid pravda.
|-
| [[tidcher#Toshikeretel|syksy]] ||suksu || || Ejn toshikeretel. Lehte spar unna made inne suksu.
|-
| [[tidcher#Mwai|syksymwai]] || 9smwai || || sama "nyns mwai"
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== T ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| tabun||  || tlko|| Brukena li hanudjin mjeta, ke fras pravda, men naj catajn; s. absalutna. ∼ akrat. O tua fsto ∼. ∼ namti pelmeni? 
|-
| tacu|| tatsu, sjan|| sko (jt)|| Ugokinai. Ugoku najpmade. ∼ o namting ine fura fu aldjin oba stoll dan. 
|-
| tajh||  || tko|| 
|-
| tajka||  || tko|| Gvirnaj dekisma, zeus. 
|-
| tajna||  || lko|| Naj deke se os siru ke. Tua ∼sma fun. ∼ plas.
|-
| tak1||  || tlko|| S. danke.
|-
| tak2 || tk || ||
|-
| [[kotobanen#al-,_apar-,_ma-,_takk-|tak-]] || || || imi sebja
|-
| talpa||  || tko|| Klane fu pasun ke ine sama plas. ∼ ine melan fu polis.
|-
| [[tidcher#Toshikeretel|talvi]] || || || Ejn toshikeretel. Na talvi, mange lant samuj.
|-
| tarakan||  || tko|| Kura os rjukofe bazi, ke vona ine djinhuome.
|-
| tasta1 ||  || tko|| Brukting pr kaku ine kompju. Nea ∼. ∼ fun perpaena ine denva. 
|-
| tasta2 ||  || sko|| Bruk taﬆa; kaku mit taﬆa. Hidas ∼. 
|-
| tatoeba||  || tko|| Sluca pr plusbra fﬆo jt. Jam moge ∼ ine afta libre. ∼ vikte pr bra lerasma. 
|-
| tchip||  || tko|| bruk nojta per festa tchip na lant. 
|-
| …te||  || avariko|| Akore atamatell fu fras.
|-
| teksti|| || tko || kotoba, fraza, punkt, wenžan al fu to je tekst.
|-
| te1 || || || suru suruca mit "te (tingko)" "nam te un ri ringo" 
|-
| teksti|| || || kotoba, fraza, punkt, wenžan al fu to je tekst.
|-
| tell|| tel|| tko|| Naj all; naj hell ting. Joku kotaba mahaena joku fu ∼ kara. Pas naj no all ∼ fu zju.
|-
| telraz||  || tko|| Joku tell fu klane fu libre, video, podkaﬆ, os a. Davi Hanu har moge bra ∼! 
|-
| temiz||  || lko|| Harena ike ting oba koza, eena niqiﬆa; k. kazif. ∼ klea. ∼ rum. Tua hejn ∼, men kot na niltid ∼ e.
|-
| ter||  || tko|| Stof fu gaja. Varuj ∼ hit, naj rupne ovasi miraj. 
|-
| terud|| || || [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| ti|| si || tlko|| 1. Brukena pr hanu cuj jt, ke naj gvir, men deke sluca os deeke sluca dan. 2. Dekiti. O catajn naj lake har pitka har, men bra ∼ li lakk. Zaju dk ∼, men dk obaprara un.
|-
| [[kotobanen#-ti|-ti]] || || || Per ting ka glaubi slucha, os deki slucha, os du mieima tsui, osos.
|-
| tid||  || tko|| Pitkasma fu e; ejn tropas fu esma fu ting. Harsma pusoj ∼ moge treng pr glau. Naj har ∼ pr tua. Afta vove sjan na tk moge ∼ dan.
|-
| tine|| i, tinni|| sko (jt os jd)|| Ugoku afta os sore naparamade; k. guca. Da ∼ un au benga.
|-
| ting||  || tko|| All, ke naj vona. Jam joku ∼ oba stol fun. Al∼ bra perun. Jam ejn ∼ ine hant fun, siru we ka?
|-
| tk|| tak|| trko|| 1. Moge. 2. Mit catajn tropas. Dk ∼ helena, naj deke vere! O moge suru ∼, ke aldjin bra.
|-
| tko||  || tko|| tingkotaba 
|-
| to1|| = tua || ||
|-
| to2|| tun|| lko|| Naj dekiena seena bides; k. kliar. ∼ mada. 
|-
| toke|| i|| tko|| Brukting pr siru tid. Aldjin har ∼ ine denva fupas. 
|-
| tola||  || lko|| Ke za. Afta libre moge cumaranaj. Vill hadji ∼.
|-
| tolka1 ||  || lko|| Iten andere. O moge ∼ hir, treng mik bite. No ∼ rega na mora. 
|-
| tolka2 ||  || trko|| S. mona. 
|-
| tone|| i|| sko (iskelik)|| Tine afta mit kuqi.
|-
| tore||  = kurica|| ||
|-
| toreu||  || tko|| Brukting, ke anta ﬆor vapa pr gatov namting. Jam bra ∼ ine kuhnja fun. 
|-
| torta||  || tko|| Sjot pan. 
|-
| [[tidcher|tosi]] || toshi || tko|| Tell fu tid sama 365 os 366 gad; tid, na koske Gaja erskoj ejn krajs akoke Soll. O har 21 ∼. Skola e na 5 ∼ miraj. 
|-
| toutoko|| tovotoko || || ein sluchaspil mit yingdjin au humbadjin. Un sada ying ine ~
|-
| trag||  || sko (klea)|| Hadji trak afta. Na mora, o ∼ palto au pipa fun, de skoj naergamade. 
|-
| trak||  || sko (klea)|| Har afta oba sebja. Dk ∼ afta klea na uk ende! Ike. 
|-
| trasak|| kjure|| tko|| Pitka midore ovasi mit oﬆre koza au iskejena smak; s. kjure.
|-
| tre||  || tko|| Lasku melan ni au kere; 3.
|-
| trea||  || sko|| rœra-ayshcha. 
|-
| treabad||  || lko|| Niabadnaj; harena pitka au paksu. 
|-
| trela|| trelo|| lko|| Haﬆe pr fﬆo; konfuza, deza; s. deza; k. klar. Joku kakutropas dekiti ∼ pr neadjin. Afta fras ∼ e. 
|-
| treng|| treny || sko|| E vikte pr suru, har. ∼ tula pr dk naunmade. paszun ~ iszke per vona. Tua libre ∼ena perun. ∼ jalaka na all dah pr zdorva.  
|-
| trist||  || lko|| Harena varuj kokara grun nafa sluca; k. glau. Mus henga pr reforma ∼ pasun. 
|-
| [[kotobanen#-tro|-tro]] || || || fu maha troposkotoba? 
|-
| tropas||  || tko|| Impla fu surusma. Dabite maha afta mit tua ∼. Vjosa∼ fu lera glosa. 
|-
| [[kotobanen#-tsa,_-lon|-tsa]] || || ||Imi "un vil du ka har afto ting". Tatoeba braanakhtsa imi "un vil du ka har braa nakht" auau.
|-
| tua|| tuo, to || pko|| Akote jt ke plusprara ine plas os na tid. ∼ pasun moge pinona e. Lakk we anta ∼ libre naunmade? Ak, sore dua ∼. 
|-
| tualet||  || tko|| Rum mit iskenaruga pr sebjasodji. All vove har ejn ∼. 
|-
| tufell|| tufel|| stufel tko|| Klea pr jalakanen. Cad ∼. ∼ fun naj gamell men perpaena. ds. kytsysta 
|-
| tuhat||  || tko|| Den rz hjaku; 1000.
|-
| tula||  || sko|| Avare skoj na jp made. Sore naj ∼ ende. 
|-
| tumam||  || tko|| Paksu au pitka ting, ke jamete skojsma bides afta. Kere ∼, ele, au poll maha ejn rum. 
|-
| tun||  = to2|| ||
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== U ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| [[kotobanen#u-|u-]] || || || 1. Ting k sļuċa os sureņa na jokżin uʔn iskat na şuçu. TTB: "Tùo paş usaadasor gelt." 2. Kundr vilna fu paś. TTB: "Un ende ufik tsigarèt" (hoćaa sor vil nai fig cigarret, men sor ende fig, tatoebagruun hjerne lakinai sor). 3. Suru na jokutel tinga jokugruun. TTB: "Uaukiun huomi." (Na gvir, Auki dvjera cetaj men aukinaj hel huomi.)
|-
| udaqi||  || tko|| Bra sluca. Naj jam lagom ∼ dan pr sintua ine bra lant. 
|-
| ugoki||  || sko|| koske du tatsu du nai ugoki. 
|-
| uk1 ||  || tko|| Tell fu tid sama 7 dag. Jam ende ejn ∼ pr suru erga. 
|-
| uk2 || jk|| tko|| Pik, ni sen mitskoj doka. Jam kere ∼ ine rum. 
|-
| ulu||  || tko|| Sjotnamena fogell, ke asa na naht.
|-
| una1 || unna || prko|| Plushobit ine sama plas; k. oba. Sorr paborte sebja OK stol dan. 
|-
| [[kotobanen#oba-/ob-/o-,_unna-|una2 …]] || unna || hadjiko|| Naj lagom, grun minusmoge; k. oba. Kuofe ∼sjot e. 
|-
| upas||  || tko|| Isilik samuj iske. ∼ spar. Lakk we jam ∼ ine kirkas fun? Fuwa ∼ na hadji fu ∼tid. 
|-
| upastid|| upatid || tko|| Ejn fu kete tell fu tosi melan hehtitid au blimatid, sama 12s, 1s, au 2s muaj. 2. Tell fu lehtitid koske samuj au upas spar. Sintuadah fun na ∼ e. 
|-
| upasun||  || tko|| Pasun mahajena fuupaskara. Nintenda moge mitrjo na danupastid, maha vi moge ∼ dan. 
|-
| usage|| sungura|| tko|| S. kanele. 
|-
| usi||  || tko|| Fuwa kira os sira njulik mit ﬆor njoj. Pan mit ∼.
|-
| uslova||  || sko|| Mjeta os fﬆo mit sama tropas. Mje feridjin cad. ∼. Dk ∼ we? 
|-
| uso||  || lko|| K. pravda. Sorr tolka hanu ∼ 
|-
| [[tidcher#Mwai|usomwai]] || 4smwai || || sama "kieres mwai"
|-
| utn||  = itn|| ||
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== V ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| [[kotobanen#wa-_/_ua-|va-]]|| wa-, ua- || || Hobittro samaimi waruj / uaruj", çigau imi ke "Ba-", sureņa uʔn uarujvil na surużin.
|-
| vala|| casok|| tko|| Ugokusma fu iske ine more. Stor ∼. Pitka ∼ 
|-
| vapa||  || lko|| Harena impla ke deke ajsa; ajsa soll au hona kara; k. samuj. ∼ dag. ∼ oca. Na imadah o spar, koske sjan, grun tk ∼ au solslag. 
|-
| [[tidcher#Mwai|vapamwai]] ||8smwai || || sama "kasis mwai"
|-
| [[varge|varge1]] <span class="anchor" id="ko_varge"></span>||  || tko|| Joku fall fu kirkas na murasake made rju kara, avn viskena fu tua. Helena ∼. ∼ fu fere. Plusplusduaena ∼ fun rosa. 
|-
| varge2 ||  || sko (jt)|| Sjan varge oba koza fu afta. O vill ∼ jube fun. Har fsore ∼ena.
|-
| varuj1 ||  || lko|| K. bra. ∼ sluca. ∼ pasun. O pravdapravda har ∼ kokara grun sluca fdok. 
|-
| varuj2 ||  || trko|| Mit varuj tropas. O ∼ hanu Vjosa. 
|-
| varye || varge1 || ||
|-
| vasu||  || sko (jt)|| Naj huske. O er∼ tua ko. Ugoku netopa fun moge bra pr ∼ varuj mjepje. A! O ∼, ke skola na mirajdah hadji. Vasu ri kotoba/namaj/imi/auauau. Milu ri (ting ke jena na gviir)/(ting du har)/(gajashtòph/jenashtòph).
|-
| vava||  || tko|| Pasun, na paratid za sintua; pasun de lapse. Qisaj ∼. Dok sentaku namae fu ∼ fdok ende? 
|-
| [[viossadiskordserver|VDS]] ||  || hobitko|| Vjosadiskordserver.
|-
| veht||  || lko|| Haﬆe pr ugoku; k. liht. ∼ isi. ∼ avto. Afta kaban oba∼ perun. 
|-
| velt||  || tko|| 1. Alplas; all Gaja. 2. Joku plas, ke lik Gaja. ∼ pravda krajs! Jam nana mare inn ∼, men har sama isketumam. Jam fig ∼ au gvir ∼ fu vi. Mogedjin zusevom fig∼ pr flire. O vill vona ine ∼ fu pone. 
|-
| ven||  || lko (cuj jd os djinklane)|| K. asor. 
|-
| vent||  || sko (jd os pr jt)|| Sjan, e ine jp de jt sluca. Da ∼ pr 7s muaj! Danke, ke dk ∼ un. Tk haste ∼ de o inn Dojclant. 
|-
| [[tidcher#Toshikeretel|vera]] || || || vapa toshikeretel
|-
| [[tidcher#Mwai|veramwai]] || 6smwai, mellanmuai || || sama "eksis mwai"
|-
| vere|| i|| sko|| Siru, ke jt pravda, hata naj jam grun. O ∼, ke Kama maha all nas. ∼ dk dekk ing all! Dk ∼ we, ke o bra? ∼ ke jam sal inn un. 
|-
| vest||  || tko|| Strela fu velt doka solsintual sluca; k. iﬆ.
|-
| vetka||  || tko|| Tell fu baum, doka lehte rupne. Stor ∼. Jam moge ∼ oba afta baum. 
|-
| [[Vi (kotoba)|vi]]|| nas|| pko|| Hanudjin au jd plus. O zaju dok. ∼ zaju dok aven! ∼ bra klane. Sore hanu cuj ∼! 
|-
| viha||  || sko (jt os kd)|| Har varuj kokara cuj afta os sore; k. dua, zaju. O ∼ koj fun. O ∼ pasun, ke ∼ un. 
|-
| vike||  =  byﬆra|| ||
|-
| viko|| || || sama "viossa kotaba"
|-
| vikte|| i|| lko|| 1. Zolena, ke sluca, os jd suru ke. 2. Jam ﬆor imi, os brukena. ∼ sluca inn vime fu djinklane. Kola ∼ pr bra zdorva. O vill, ke o lik ona seena, men porvakrajs naj ∼ perun. 
|-
| Vilant||  || tko|| Gvirnaj plas, doka hanu Vjosa. O vill vona ine ∼.
|-
| viliber||  || tko|| Libre, ke kakujena mit Vjosa.
|-
| vill|| vil|| sko (jt)|| Har kokara, ke treng os vikte. Aldjin ∼ lera Vjosa. ∼ we rega? O ∼ bli ona.
|-
| vime|| i|| tko|| Hanusma cuj jokusluca na dan. � vime fu djinklane, all, ke sluca na dan fu all pasun. Gameldjin hanu ∼ inekrajs fu honaplas. 
|-
| vinja||  || tko|| Kirkasena glugting, ke mahaena fu fraut kara. Rju ∼. Sira∼.
|-
| vint||  || tko|| Ugokusma fu luft oba gaja. Djiong ∼. 
|-
| vintkreldaj||  || tko|| Byﬆra vint, ke skoj ine krajs. Jam more ∼ ine amerikalant.
|-
| virta||  = iskenaruga|| ||
|-
| visk||  || sko (jt)|| Ugoku radi afta naj har parjan. ∼ jajco pr gatov amlet.
|-
| vitke||  || sko (mit jd)|| E ine sama plas na sama tid akote sore pr maha miksma. ∼ mit mik. Da ∼ mitrjo!
|-
| vitu||  || tko|| Tell fu netopa melan jalaka pr sintua au qi, doka ugoku ine afta. Naj all pasun ke har ∼ ona e.
|-
| Vjosa||  || tko|| Namae fu klaniergalik pidjinglosa, Vjosadiskordserver hanu ke; glosa fu vi. ∼ lecte glosa ine velt.
|-
| [[viossadiskordserver|Vjosadiskordserver]] || viossadiskordserver  || tko|| Plusplusﬆor zeplas, doka hanu Vjosa.
|-
| vjosadjin||  || tko|| Namaenen fu pasun, ke siru bra Vjosa, ine Vjosadiskordserver.
|-
| voj||  || tko|| Fuwa os iskelik njulik mit fuwafuwa smak. No mogedjin pan mit ∼. 
|-
| vojfraut|| milenial|| tko|| Kira-midore pitka au fuwa fraut.
|-
| vona1 ||  || sko|| Ersintua dan au naj e sinuena. ∼ting. Treng glug pr ∼. Na jokutid haste ∼. 
|-
| vona2 ||  || sko (ine jp)|| E, skoj, rupne, kavare, no, kola, hanasu, auauau der. Tua vive ∼plas fun. O ∼ ine Vilant.
|-
| vona3 ||  || tko|| 1. All, ke vona. 2. Vonasma.
|-
| vonaros||  || tko|| Snana rju iskelik ine all djor au pasun, ke bidra luft. Pulap ∼.
|-
| vove|| huome (huomi)|| tko|| Zusevomting, pasun vona ine ke. Stor ∼. ∼ fun. Moge inn Amerika sama pr seena e. 
|-
| vras||  || sko (jd os jt)|| Suru, ke sore os afta naj vona os dvajbma grun slag, cer, os a.; l. perpa. ∼ pasun. ∼ kurica pr gatov. O ∼ denva fun dan.
|-
| vui || || || sama "fu vi"
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

==== W ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| wakuwaku||  || lko|| kokoro bra tsui mirai. 
|-
| we|| ve|| tlko|| Spure li ak os naj. Dekk anta ∼ na un made? 
|-
| wenzyan|| venzan, wenzan || tko||  ko -> fras -> punkt -> wenzyan -> (libre)
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== X ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== Y ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| yalba || || lko || [[Zeting:stur_chisai.jpg|50px|thumb|left|]]
|-
| [[Tidcher#Ykdag|yk]] || =uk || || Yk har nana ykdag. Toshi har 52 yk. Jam moge chigau ykdag namae. Demisaliossa namae fu ykdag est: Lunadag, Hachidag, Vainedag, Tordag, Prendag, Krondag au Soldag. 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]
==== Z ====
{| class="wikitable" style="margin:auto"
|-
! kotaba !! samaimiko / ander gavor !! kotabafal !! mahaklarsma
|-
| za||  || mitko|| Akote jt, ke sluca na dan fu hina fras; k. de. Suru ∼ mjeta. Na miraj ∼ skola o ti glau. Vi jamete dan, ∼ sore hanu, ke sorr naj ajsa tk. O avn ajsa varujnen dan, ∼ o mjeta, ke sore naj vill suru, men o suru. 
|-
| za2 || || || "un mahdan za" 
|-
| zaju|| gami|| sko (jd)|| Har bra fuwafuwa kokara cuj sore; k. viha. Vi ∼ mik fuvi. O sama∼lik pasun, o ∼ ona. Mje, sore tk miklik, grun sore ∼ dk. Naj siru li oba∼, sit dk lakk posiru. O ∼ dk, sladkidjin. O ∼ all pasun 
|-
| zall||  || tlko|| Hanujena za varuj sluca fu andere pasun.
|-
| zam||  = zan|| ||
|-
| zan1 || zam|| tko|| Ting ke pasun au djor hir mit korva. O naj dua ∼ fu koj fun. 
|-
| zan2 || zam|| sko (diriri)|| Maha zan mit afta.
|-
| zange||  || tko|| Portugale os rju koza, ke oba jerkat grun iske. ∼lik gamell avto.
|-
| zanjat||  || lko|| Naj pusoj; naj lakiena suru andere ting. Dk ∼ we? 
|-
| zauh||  || tko|| Namting mahaena fu iskelik au isilik namting kara; ds. ﬆa. O no mura∼ na all mora.
|-
| zdorva1 ||  || tko|| Bra ergaena fu netopa fu vonating. Atama∼. Netopa∼. Bra∼sta! Pas zoll kjomuske ∼ fupas. 
|-
| zdorva2 ||  || lko (cuj jd os suruzma)|| 1. Harena bra zdorva; k. bjurke. 2. Bra pr zdorva. O ∼. ∼ namena. Cigaret ∼ we?
|-
| [[kotobanen#ze-|ze…]] ||  || hadjiko|| 1. Brukena zeus. 2. Akote kompju. ∼ting. ∼brukting. ∼pocta. 
|-
| zeburja||  || tko|| Kriz pagoda mit ﬆor pluj a zeusslag. Kriz pr skoj ine qip na ∼.
|-
| zekaban || || tko || plas fu zeting
|-
| zela||  || sko|| Vill, inona. Aldjin ∼ bra ting pr fame fusore.
|-
| zekyannosting || || || zekyannosting fu python cpython est. 
|-
| zeret || || || plas doko djin deki 
|-
| zetin|| zeting || tko|| spil.exe au teksti.txt auauau zetin est. 
|-
| zettai || || || ~ lik 100% deki slucha
|-
| [[Zejus|zeus]] || zejus  || tko|| 1. Dekisma fu maha erga fu vonating. 2. Djiong ke skoj bides erkat. O har nill ∼ ima, o zoll skoj na bet made. Naj jam sal∼ akote un pr ring ima. Treng ∼ pr kompju dvajbma. 
|-
| ziha|| zitja|| lko|| K. kriz. O tk zela ∼ ajsa. 
|-
| zipkvam||  || sko (jt os jd)|| Bra fﬆo os siru; har moge hsfull mit afta; se sore na mogetid, snana. Du ∼ we, hur reforma kompju? Vi ∼ mitrjo.
|-
| zjelma||  || lko|| Acorena.
|-
| zju||  || tko|| Stor djor mit nor ine nuncan ke anta nju.
|-
| [[kotobanen#-zma|-zma]] || -sma || || Mah likko, surko, au tinyko "miepielik" made. Tatoeba: Koske du vapa, vapazma jam na du.
|-
| znači|| =imi || ||
|-
| znakoma||  || sko (mit jd)|| Hanasu mit jd radi siru rjoha. Inona vi dekk ∼ mitrjo!
|-
| zoll|| zol|| sko|| Mus, grun ruru, vilsma, sal, auauau. Vjosa ∼ kavare! Dk ∼ se plusmoge fu gavor fun. Du naj ∼ hanu mit un na imatid. 
|-
| zot||  || sko (jt)|| Suru, ke afta hona. Baum bra pr ∼.
|-
| zusewom||  || sko (jt)|| 1. Rzsjan oba au/os akote sebja pr maha ejn djong ting afta kara. 2. Maha. ∼ isi pr maha tumam. ∼ vove. O ∼ kotoli pr Vjosa! 
|-
| zvezda||  || tko|| 1. Kirkasena pik ine sinijplas na naht. 2. Honamjah ine avara. ∼ tk henela na afta naht! Soll ∼ fuvi e, afta anta vona na vi made. 
|}

pall na: [[#0-9/A]] [[#B]] [[#C]] [[#D]] [[#E]] [[#F]] [[#G]] [[#H]] [[#I]] [[#J]] [[#K]] [[#L]] [[#M]] [[#N]] [[#O]] [[#P]] [[#Q]] [[#R]] [[#S]] [[#T]] [[#U]] [[#V]] [[#W]] [[#X]] [[#Y]] [[#Z]] [[#top|#Hadji]]

'''Dabitte reforma au/os nazi neokotaba ine afta kotoli!'''

`;

console.log(parseWikiTables(wikiText));
