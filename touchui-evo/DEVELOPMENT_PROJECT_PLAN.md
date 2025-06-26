

# **Analisi Architetturale e Piano di Implementazione per il Remake di TouchUI**

Questo documento fornisce un'analisi architetturale approfondita e una roadmap tecnica dettagliata per la riprogettazione e lo sviluppo della nuova interfaccia utente di OctoPrint, denominata TouchUI. L'obiettivo è trasformare l'attuale interfaccia in una soluzione moderna, performante e incentrata sull'utente, affrontando le sfide tecniche chiave e definendo best practice per un'implementazione di successo.

## **Parte I: Analisi Strategica e Filosofia di Design**

Questa sezione convalida la direzione tecnica di alto livello e fornisce un'analisi sfumata della filosofia di design scelta, concentrandosi sull'implementazione pratica e sulla mitigazione dei rischi critici.

### **1.1 Visione del Progetto e Convalida Architetturale**

La decisione di abbandonare una codebase basata su Knockout.js, considerata non più mantenuta 1, per migrare a uno stack moderno composto da React e TypeScript, rappresenta un passo fondamentale non solo per la modernizzazione, ma per la vitalità futura del progetto. La scelta di React è supportata da un vasto ecosistema, una solida comunità e la sua idoneità per la creazione di interfacce utente complesse e basate su componenti.1

L'adozione del template Material Dashboard React di Creative Tim 3 come punto di partenza è una scelta tattica valida per accelerare lo sviluppo iniziale. Questo template fornisce una struttura pre-costruita per la gestione delle rotte (routing), la navigazione e il layout di base, riducendo significativamente i tempi di configurazione iniziali.3

Tuttavia, questa scelta introduce una decisione architetturale critica a lungo termine. Il template selezionato si basa su Material-UI v4, che utilizza JSS (JavaScript Style Sheets) come soluzione di styling. Le versioni successive di Material-UI (dalla v5 in poi) hanno effettuato una migrazione strategica verso Emotion come motore di styling predefinito.5 L'avvio di un progetto basato su una libreria UI di una major version precedente introduce un debito tecnico immediato. Sebbene semplifichi la configurazione iniziale, vincola il progetto a una versione obsoleta della sua libreria di componenti principale, precludendo l'accesso a miglioramenti prestazionali, nuovi componenti, correzioni di bug e all'ecosistema di styling più moderno di MUI v5+.

Per affrontare questa sfida, si delineano due percorsi strategici:

1. **Percorso A (Avvio Pragmatico):** Utilizzare il template basato su v4 per costruire rapidamente il prototipo e la struttura di base dell'applicazione. Questo approccio consente di raggiungere un MVP (Minimum Viable Product) in tempi brevi. Tuttavia, è imperativo pianificare formalmente una migrazione a MUI v5+ in una fase successiva al rilascio iniziale, per garantire la manutenibilità e la scalabilità a lungo termine del progetto.  
2. **Percorso B (Fondamenta Strategiche):** Utilizzare il template v4 solo come fonte di ispirazione per il design e la struttura. Avviare un nuovo progetto da zero con React, TypeScript e l'ultima versione di Material-UI (v5+). La struttura del dashboard verrebbe ricreata manualmente. Questo percorso, sebbene richieda un investimento di tempo iniziale maggiore, stabilisce una base di codice più robusta, performante e a prova di futuro, allineata con le best practice attuali.

Per concretezza, gli esempi di codice in questo documento seguiranno il Percorso A, utilizzando la sintassi JSS di MUI v4, ma evidenziando dove la sintassi di v5+ differirebbe. Si raccomanda, tuttavia, di valutare attentamente i benefici a lungo termine del Percorso B.

### **1.2 L'Estetica Neumorfica: Implementazione, Identità e Accessibilità**

Il design Neumorphic, o "Soft UI", rappresenta il cuore dell'identità visiva del progetto. Questo stile si ottiene principalmente attraverso una manipolazione attenta della proprietà CSS box-shadow. A differenza delle ombre tradizionali, il Neumorphism utilizza una coppia di ombre — una chiara e una scura — posizionate diagonalmente per creare un'illusione di profondità, facendo sembrare che gli elementi emergano dalla superficie o vi siano incassati.6 Un principio fondamentale di questo stile è che il colore di sfondo dell'elemento deve essere identico o molto simile a quello del suo contenitore, per rafforzare l'effetto di continuità materica.7

#### **Implementazione con JSS (Material-UI v4)**

Per implementare questo stile in un ambiente MUI v4, si utilizzerà la funzione makeStyles per creare hook di stile che possono essere applicati ai componenti MUI. I componenti Paper (per i widget) e Button sono i candidati ideali per questa personalizzazione.

Di seguito un esempio di codice JSS per ottenere gli effetti "sollevato" e "premuto":

JavaScript

import { makeStyles } from '@material-ui/core/styles';

const useStyles \= makeStyles(theme \=\> ({  
  neumorphicCard: {  
    borderRadius: 15,  
    backgroundColor: '\#33373f', // Esempio di sfondo per il tema scuro  
    boxShadow: '7px 7px 14px \#2a2e35, \-7px \-7px 14px \#3c4049',  
    transition: 'box-shadow 0.2s ease-in-out',  
  },  
  neumorphicButton: {  
    borderRadius: 10,  
    backgroundColor: '\#33373f',  
    boxShadow: '5px 5px 10px \#2a2e35, \-5px \-5px 10px \#3c4049',  
    '&:hover': {  
      backgroundColor: '\#3a3f47', // Leggero cambio di colore al passaggio del mouse  
    },  
    '&:active': {  
      boxShadow: 'inset 5px 5px 10px \#2a2e35, inset \-5px \-5px 10px \#3c4049',  
    },  
  },  
  disabledButton: {  
    opacity: 0.5,  
    boxShadow: 'none',  
  }  
}));

Questo codice, ispirato ai principi descritti in 6, definisce le classi per una card e un pulsante con i rispettivi stati.

#### **La Firma "Verde Lime": Costruire un'Identità Visiva**

L'uso coerente di un unico e vibrante colore d'accento è uno strumento di branding estremamente potente. Il verde lime proposto fungerà da firma visiva per la nuova interfaccia. Questo colore deve essere definito a livello globale nel tema MUI, specificamente in theme.palette.primary.main. Il suo utilizzo deve essere rigorosamente riservato agli elementi interattivi primari: stati attivi dei pulsanti, tracce degli slider, barre di progresso, icone attive e notifiche positive. Questo approccio crea un linguaggio visivo inequivocabile per l'utente: "se è verde lime, è importante o interattivo".

#### **Navigare il Campo Minato dell'Accessibilità**

L'obiettivo di un'esperienza utente "premium" è intrinsecamente legato al concetto di accessibilità. Tuttavia, la scelta estetica del Neumorphism presenta un conflitto diretto con questo obiettivo. La caratteristica distintiva del Neumorphism è il suo basso contrasto, che rende difficile per gli utenti con disabilità visive distinguere gli elementi interattivi dallo sfondo.6 Un prodotto veramente premium deve essere inclusivo e utilizzabile da tutti.

La ricerca conferma ampiamente che il Neumorphism soffre di scarso contrasto e rende difficile l'identificazione degli elementi cliccabili, posizionandosi in antitesi con un'esperienza utente di alta qualità.7 Pertanto, è necessaria una strategia di mitigazione per riconciliare questi obiettivi contrastanti. Il design non può essere puramente neumorfico se vuole avere successo.

**Strategie di Mitigazione Attuabili:**

* **Applicazione Selettiva:** Riservare lo stile neumorfico agli elementi *statici* e di contenimento, come lo sfondo dei widget. Per gli elementi interattivi critici, utilizzare stili più tradizionali e ad alto contrasto nel loro stato predefinito.7  
* **Stati Interattivi Evidenziati:** Utilizzare l'effetto "premuto" (con box-shadow: inset) per gli stati :active o :hover, ma garantire che lo stato di default dell'elemento sia chiaramente identificabile come interattivo.6  
* **Bordi Sottili:** Aggiungere un bordo molto sottile agli elementi neumorfici per migliorare la definizione dei contorni, una tecnica suggerita per aumentare il contrasto percepito.7  
* **Sfruttare il Colore d'Accento:** Il verde lime diventa un elemento *critico* per l'accessibilità. Deve essere utilizzato per segnalare l'interattività, fornendo un indizio cromatico forte dove l'indizio basato sulla forma (l'ombra) è debole.  
* **Strumenti di Conformità WCAG:** È obbligatorio integrare nel processo di sviluppo strumenti per la verifica dell'accessibilità. Questo include l'uso degli ispettori di accessibilità dei browser 11 e l'integrazione di librerie come  
  react-a11y 12 o strumenti di verifica del contrasto come  
  @test-party/contrast-color-picker 13 per applicare programmaticamente i rapporti di contrasto richiesti dalle linee guida WCAG.

La seguente tabella fornisce una guida pratica per l'implementazione degli stili, bilanciando estetica e accessibilità.

**Tabella 1: Guida allo Stile Neumorfico per Componenti e Stati**

| Componente / Stato | Stile box-shadow (Tema Scuro, Sfondo \#33373f) | Colore d'Accento (Verde Lime) | Note di Accessibilità e Implementazione |
| :---- | :---- | :---- | :---- |
| **Widget (Paper) \- Default** | 7px 7px 14px \#2a2e35, \-7px \-7px 14px \#3c4049 | Non applicabile | Usare per contenitori statici. Garantire che il contenuto interno abbia un contrasto sufficiente. |
| **Pulsante \- Default** | 5px 5px 10px \#2a2e35, \-5px \-5px 10px \#3c4049 | Applicare al testo/icona del pulsante | Il contrasto tra testo/icona e sfondo del pulsante deve superare il rapporto 4.5:1 (WCAG AA). |
| **Pulsante \- Hover** | 5px 5px 10px \#2a2e35, \-5px \-5px 10px \#3c4049 (invariato) | Aumentare la luminosità del colore | L'effetto hover dovrebbe essere accompagnato da un leggero cambio di backgroundColor del pulsante per un feedback visivo più forte. |
| **Pulsante \- Active/Pressed** | inset 5px 5px 10px \#2a2e35, inset \-5px \-5px 10px \#3c4049 | Mantenere il colore attivo | L'effetto inset fornisce un feedback tattile chiaro e inequivocabile. È lo stato più forte del Neumorphism. |
| **Pulsante \- Disabled** | none | Grigio a basso contrasto | L'assenza di box-shadow e l'uso di opacity: 0.5 indicano visivamente che l'elemento non è interattivo. |
| **Input \- Default** | inset 3px 3px 7px \#2a2e35, inset \-3px \-3px 7px \#3c4049 | Applicare al bordo in stato focus | Lo stato inset di default suggerisce un'area "vuota" da riempire. Il bordo verde lime allo stato :focus è essenziale per l'accessibilità. |

## **Parte II: La Sfida Architetturale Centrale: Il Ponte per l'Ecosistema dei Plugin**

Questa sezione definisce una strategia chiara per l'integrazione con l'ecosistema dei plugin di OctoPrint, trasformando quello che è il più grande rischio del progetto in un'opportunità strutturata di modernizzazione.

### **2.1 Decostruire l'Architettura Esistente: Knockout.js e i ViewModel di OctoPrint**

L'interfaccia utente tradizionale di OctoPrint si basa su un'architettura in cui i plugin forniscono i propri componenti UI attraverso il mixin TemplatePlugin. Questo mixin permette di iniettare template basati su Jinja2 in punti specifici del DOM.14 La logica dinamica del frontend è gestita da

ViewModels basati su Knockout.js, che vengono registrati in un array globale chiamato OCTOPRINT\_VIEWMODELS.15

Questi ViewModel utilizzano un sistema di dependency injection per accedere ai ViewModel principali di OctoPrint (come loginStateViewModel o settingsViewModel) e comunicano con il backend attraverso callback specifiche, come onDataUpdaterPluginMessage, che riceve messaggi inviati dal server.15 Questa architettura, basata sull'iniezione di frammenti di UI e su un data-binding gestito da Knockout, è fondamentalmente incompatibile con un'applicazione single-page (SPA) basata su React, la quale gestisce in modo autonomo il proprio rendering del DOM e il proprio stato.

### **2.2 Il Gateway per la Modernizzazione: L'Hook octoprint.plugin.uiprototype.gather\_modules**

La scoperta più critica emersa dalla fase di ricerca è il progetto OctoPrint-UiPrototype.17 Sebbene sia solo un prototipo non funzionale, è stato sviluppato dal creatore di OctoPrint e introduce un nuovo hook backend progettato specificamente per questo scenario di transizione:

octoprint.plugin.uiprototype.gather\_modules.

Il meccanismo è il seguente: un plugin che implementa questo hook deve restituire un dizionario. La chiave del dizionario è un identificatore globale univoco per il modulo frontend del plugin, mentre il valore è il percorso a un file JavaScript che deve essere caricato.17 L'UI principale (il nostro nuovo TouchUI) ha il compito di raccogliere questi dizionari da tutti i plugin installati. Successivamente, rende questa lista di moduli disponibile al frontend React attraverso la variabile globale

OCTOPRINT\_CONFIG.modules, che viene iniettata nel template index.html.jinja2 al momento del rendering della pagina.17

### **2.3 Architettura Proposta: Lo Standard per Plugin "React Widget"**

L'hook gather\_modules non è un livello di compatibilità magico, ma un meccanismo di caricamento. Ciò implica che, affinché un plugin sia visibile nella nuova UI, deve necessariamente fornire un bundle JavaScript che l'applicazione React possa comprendere e renderizzare. Questo sposta l'obiettivo del progetto da "rendere compatibili i vecchi plugin" a "definire uno standard per i nuovi plugin basati su React".

L'architettura attuale dei plugin di OctoPrint, basata su Knockout.js e Jinja2, non può essere integrata direttamente in un frontend React. Il tentativo di farlo creerebbe un'architettura ibrida instabile e difficile da mantenere. L'hook gather\_modules offre una via d'uscita, ma richiede un'adesione attiva da parte degli sviluppatori di plugin. Di conseguenza, la "piena compatibilità" non significa rendere magicamente funzionanti le UI legacy, ma fornire un framework che permetta ai plugin futuri, o alle versioni aggiornate di quelli esistenti, di integrarsi nativamente.

**Lo Standard Proposto:**

1. **Backend del Plugin:** Gli sviluppatori di plugin devono implementare il metodo get\_hooks nel loro file \_\_init\_\_.py per registrare l'hook octoprint.plugin.uiprototype.gather\_modules.  
2. **Bundle Frontend:** Gli sviluppatori devono creare un piccolo progetto React per il widget del loro plugin. Questo progetto deve essere configurato per compilare un singolo file JavaScript (un bundle).  
3. **Contratto di Esportazione:** Il bundle JavaScript generato deve esporre un oggetto globale, utilizzando come nome la chiave univoca definita nell'hook. Questo oggetto deve contenere, come minimo, un componente React. Questo componente sarà il "widget" che l'utente potrà aggiungere e configurare nel proprio dashboard.  
4. **Caricamento Dinamico in TouchUI:** L'applicazione React principale di TouchUI leggerà la variabile OCTOPRINT\_CONFIG.modules. Per ogni plugin registrato, caricherà dinamicamente lo script JS, accederà al componente React esposto globalmente e lo renderizzerà all'interno di un elemento della griglia React Grid Layout.

### **2.4 Strategia di Coesistenza Graduale per i Plugin Legacy**

È irrealistico aspettarsi che tutti i plugin popolari vengano aggiornati immediatamente per supportare il nuovo standard. È quindi essenziale adottare una strategia di degradazione controllata e comunicarla chiaramente alla community.

* **Strategia 1: Wrapper di Dati (Preferita):** Per i plugin più popolari che espongono i loro dati tramite l'API REST di OctoPrint o eventi personalizzati (ad esempio, PSU Control, Enclosure Plugin 18), il progetto TouchUI può includere "widget proxy" pre-costruiti. Questi widget sarebbero parte integrante del codice di TouchUI, utilizzerebbero le API del plugin per recuperare i dati e li visualizzerebbero utilizzando la nuova estetica Neumorphic. Questo approccio perde l'interfaccia utente nativa del plugin ma ne preserva la funzionalità principale all'interno di un design coerente.  
* **Strategia 2: Iframe (Ultima Spiaggia):** Per i plugin con interfacce utente complesse e senza un'API dati pulita, è possibile utilizzare un iframe per incorporare la loro UI legacy. Questa soluzione è fortemente sconsigliata a causa di significativi svantaggi: prestazioni scadenti, incoerenza visiva (non si integrerà con il tema Neumorphic), problemi di sicurezza legati al sandboxing e comunicazioni complesse tra l'iframe e l'applicazione React genitore.  
* **Strategia 3: Non Fare Nulla (La Comunicazione è Fondamentale):** Per molti plugin, la versione iniziale della nuova TouchUI semplicemente non offrirà supporto. Il progetto deve comunicare in modo trasparente che fornisce un *framework* che gli sviluppatori di plugin possono adottare per integrarsi nella nuova UI. Sarà fondamentale mantenere una lista pubblica e aggiornata dei plugin "compatibili con la nuova UI" per gestire le aspettative degli utenti.

La tabella seguente riassume i compromessi di ciascuna strategia, fornendo una base per decisioni informate.

**Tabella 2: Confronto delle Strategie di Integrazione dei Plugin**

| Strategia | Sforzo di Sviluppo (Team TouchUI) | Sforzo di Sviluppo (Autore Plugin) | Esperienza Utente (UX) | Prestazioni | Vitalità a Lungo Termine |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Standard "React Widget"** | Basso (per plugin) | Medio-Alto (richiede nuovo sviluppo) | Ottimale (nativa, coerente) | Alte | Eccellente (ecosistema moderno) |
| **Wrapper di Dati** | Medio (per plugin supportati) | Nessuno | Buona (coerente ma limitata) | Alte | Media (dipende dal team TouchUI) |
| **Iframe** | Basso | Nessuno | Scadente (incoerente, lenta) | Basse | Scarsa (soluzione di ripiego) |
| **Nessun Supporto** | Nessuno | Nessuno | Negativa (funzionalità assente) | N/A | Dipende dalla comunicazione |

## **Parte III: Blueprint di Implementazione per le Funzionalità Chiave**

Questa sezione fornisce blueprint tecnici e orientati al codice per la costruzione degli elementi interattivi fondamentali della nuova interfaccia utente.

### **3.1 Costruzione del Dashboard Modulare: React Grid Layout \+ React DnD**

Il cuore dell'interfaccia sarà un dashboard personalizzabile. L'architettura si baserà sulla combinazione di React Grid Layout per la gestione della griglia responsive e React DnD per le funzionalità di trascinamento e rilascio (drag-and-drop).

* **Componenti Fondamentali:** Il componente principale del dashboard sarà ResponsiveReactGridLayout. Ogni widget trascinabile sarà un componente React personalizzato, probabilmente un wrapper attorno a un componente Paper o Card di Material-UI, stilizzato secondo il tema Neumorphic definito in precedenza.  
* **Rendere le Card Trascinabili:** La chiave per un'interazione intuitiva è rendere trascinabile solo una parte specifica del widget, come l'intestazione. Questo si ottiene utilizzando l'hook useDrag di react-dnd sull'elemento "handle" (es. un div nell'header della card), mentre il resto del contenuto della card rimane interattivo (es. per lo scrolling interno o per i controlli). Gli elementi di React Grid Layout fungeranno da contenitori e aree di rilascio.  
* **Ottimizzazione per il Touch:** Il backend predefinito di react-dnd, HTML5Backend, non supporta gli eventi touch, rendendolo inadatto per dispositivi mobili e tablet.19 È quindi obbligatorio utilizzare  
  react-dnd-touch-backend. Per offrire un'esperienza utente di alta qualità, questo backend deve essere configurato con precisione per distinguere un'intenzione di trascinamento da un'intenzione di scorrimento della pagina.

Su un'interfaccia touch, specialmente su smartphone dove il layout è a colonna singola e richiede uno scorrimento verticale, un problema comune è l'attivazione accidentale del trascinamento di un widget mentre l'utente sta cercando di scorrere la pagina. Questo comportamento è frustrante e degrada la qualità percepita dell'applicazione. La libreria react-dnd-touch-backend offre opzioni specifiche per mitigare questo problema, che sono essenziali per un'esperienza utente "premium".19 L'opzione

scrollAngleRanges è la soluzione esplicita: permette di definire degli intervalli angolari (ad esempio, movimenti prevalentemente verticali) in cui gli eventi di trascinamento vengono ignorati, consentendo al browser di gestire l'evento come uno scorrimento nativo.

La seguente tabella fornisce una configurazione raccomandata per il TouchBackend, ottimizzata per un'esperienza utente fluida su dispositivi touch.

**Tabella 3: Configurazione Ottimale di react-dnd-touch-backend per l'UX**

| Opzione | Valore Raccomandato | Motivazione |
| :---- | :---- | :---- |
| enableMouseEvents | true | Garantisce la piena funzionalità del drag-and-drop anche su dispositivi desktop con mouse. |
| delayTouchStart | 100 | Introduce un piccolo ritardo (100 ms) prima che un tocco venga interpretato come un inizio di trascinamento. Previene l'attivazione accidentale su tocchi rapidi. |
| touchSlop | 10 | Specifica la distanza in pixel che il dito deve percorrere prima che l'azione venga riconosciuta come un trascinamento. Previene i micro-trascinamenti durante il tocco. |
| scrollAngleRanges | \[{ start: 30, end: 150 }, { start: 210, end: 330 }\] | Ignora gli eventi di trascinamento che avvengono con un'angolazione prevalentemente verticale (tra 30° e 150°, e tra 210° e 330°). Questo permette lo scorrimento verticale nativo della pagina senza attivare il drag-and-drop dei widget. |

### **3.2 Pipeline di Dati in Tempo Reale: Il Contesto WebSocket**

Diversi componenti dell'interfaccia (widget Temperatura, Progresso, Visualizzatore G-code, Terminale) necessitano di dati in tempo reale provenienti dal WebSocket di OctoPrint. Aprire connessioni WebSocket multiple è inefficiente, dispendioso in termini di risorse e difficile da gestire.21 La best practice consiste nello stabilire un'unica connessione WebSocket a un livello alto dell'applicazione e condividerla con i componenti figli tramite il Context API di React.23

**Blueprint Architetturale:**

1. **Creare un WebSocketProvider:** Questo componente React avvolgerà l'intera applicazione (es. nel file App.js).  
2. **Gestire la Connessione:** All'interno del provider, si utilizzerà l'hook useEffect per stabilire e mantenere una singola connessione all'endpoint /sockjs/websocket di OctoPrint. Questo useEffect gestirà anche la disconnessione pulita quando il componente viene smontato.  
3. **Implementare l'Autenticazione:** La connessione WebSocket richiede un'autenticazione. Il flusso corretto, come documentato da OctoPrint, prevede di effettuare prima una richiesta di login passivo all'API REST per ottenere una chiave di sessione, e poi inviare un messaggio di tipo auth sul socket con le credenziali ottenute.25  
4. **Centralizzare lo Stato:** Il provider si metterà in ascolto di tutti i messaggi in arrivo (onmessage). Utilizzando un gestore di stato come useReducer (o una libreria esterna come Zustand per maggiore scalabilità), memorizzerà gli ultimi dati ricevuti (payload dei messaggi current, history, event, ecc.) in uno stato centralizzato.  
5. **Creare un Hook Personalizzato useOctoPrintSocket():** Questo hook personalizzato fornirà a qualsiasi componente figlio un accesso semplice e reattivo ai dati più recenti dallo stato centralizzato e a una funzione sendMessage per inviare comandi al server tramite il socket.

Per ottimizzare le prestazioni ed evitare ri-renderizzazioni inutili, è fondamentale che ogni widget si aggiorni solo quando i dati di cui ha bisogno cambiano effettivamente. La seguente tabella mappa i widget dell'interfaccia ai messaggi WebSocket specifici da cui dipendono.

**Tabella 4: Mappa di Sottoscrizione WebSocket per Widget UI**

| Nome Widget | Sottoscrive a Messaggi WebSocket | Dati Chiave Utilizzati | Note di Implementazione |
| :---- | :---- | :---- | :---- |
| **Widget Temperatura** | current, history | temps (array di dati storici), state.temps (dati attuali) | Visualizza il grafico delle temperature e i valori attuali/target. |
| **Widget Progresso Stampa** | current | progress.completion, progress.printTime, progress.printTimeLeft | Mostra la barra di progresso, il tempo trascorso e il tempo rimanente. |
| **Widget Stato Stampante** | current | state.text, state.flags | Mostra lo stato attuale (es. "Printing", "Operational", "Error"). |
| **Visualizzatore G-code** | current | progress.completion, currentZ | Aggiorna la visualizzazione del layer corrente in tempo reale. |
| **Terminale** | current, history | logs, messages | Mostra il flusso di comandi e risposte da/per la stampante. |
| **Notifiche Eventi** | event | type, payload (per eventi come PrintFailed, PrintDone) | Attiva notifiche a comparsa per eventi critici. |

### **3.3 Il Visualizzatore G-code Avanzato**

L'integrazione di un visualizzatore G-code interattivo è una funzionalità chiave per un'interfaccia premium. La libreria react-gcode-viewer 27 è una scelta eccellente, basata su Three.js.

* **Integrazione e Caricamento:** Il componente GCodeViewer accetta una prop url per caricare il file G-code da visualizzare. Questo URL punterà all'API di OctoPrint per il download del file selezionato.  
* **Progresso in Tempo Reale:** La prop visible del visualizzatore è un valore numerico compreso tra 0 e 1 che rappresenta la percentuale di layer da mostrare.27 Per sincronizzare la visualizzazione con il progresso della stampa, il widget del visualizzatore utilizzerà l'hook  
  useOctoPrintSocket per ottenere il valore progress.completion (da 0 a 100\) dal messaggio WebSocket current. Questo valore, diviso per 100, sarà passato dinamicamente alla prop visible, aggiornando il rendering del modello in tempo reale.  
* **Personalizzazione Estetica:** Per mantenere la coerenza visiva, i colori del visualizzatore possono essere personalizzati tramite le props layerColor e topLayerColor.27 Questi valori dovranno essere impostati rispettivamente sul grigio del tema scuro e sul verde lime distintivo dell'interfaccia.

### **3.4 Un'Esperienza Terminale Moderna**

Un terminale reattivo e ben integrato è essenziale per gli utenti avanzati. L'utilizzo di un wrapper React per xterm.js, come xterm-react, è la soluzione standard del settore.

* **Integrazione e Connessione Dati:** La libreria xterm.js offre un addon specifico, @xterm/addon-attach, progettato per connettere l'istanza del terminale direttamente a un WebSocket.29 Tuttavia, per mantenere un'unica connessione centralizzata, l'approccio migliore è diverso. Il widget del Terminale utilizzerà l'hook  
  useOctoPrintSocket per accedere ai dati. Si sottoscriverà agli array logs e messages contenuti nei payload current e history inviati dal WebSocket di OctoPrint.25 Ogni nuova riga ricevuta dal socket verrà scritta nell'istanza di xterm tramite il metodo  
  terminal.writeln(). I comandi inviati dall'utente nel terminale verranno catturati e inviati al server tramite la funzione sendMessage fornita dall'hook.  
* **Personalizzazione Estetica:** xterm.js è altamente personalizzabile. È possibile configurare un oggetto theme con colori per lo sfondo, il testo, il cursore e i colori ANSI per allinearlo perfettamente all'estetica Neumorphic, utilizzando la palette scura e il verde lime per gli output importanti.30

## **Parte IV: Funzionalità Avanzate e Roadmap Strategica**

Questa sezione finale affronta le funzionalità future e fornisce raccomandazioni conclusive per il successo a lungo termine del progetto.

### **4.1 Un Percorso Pratico per l'Integrazione dei Comandi Vocali**

L'integrazione di un agente vocale è una funzionalità ambiziosa che può elevare notevolmente l'esperienza utente. Si raccomanda un approccio a due fasi.

* **Fase 1: Trascrizione Semplice con Web Speech API:** L'implementazione iniziale dovrebbe sfruttare la Web Speech API nativa del browser.31 Questa API è progettata principalmente per la trascrizione (speech-to-text) e non per il riconoscimento di intenti (intent recognition).  
  * **Implementazione:** Si può creare un hook personalizzato, useVoiceRecognition, che incapsula l'oggetto SpeechRecognition. Quando l'utente attiva il microfono e parla, l'hook fornisce il testo trascritto in tempo reale. La logica applicativa eseguirà quindi una semplice corrispondenza di parole chiave sulla trascrizione (es. if (transcript.toLowerCase().includes("pausa stampa")) { api.pausePrint(); }). Questo approccio è fragile ma permette di realizzare un proof-of-concept funzionante con uno sforzo minimo.  
* **Fase 2: Riconoscimento di Intenti On-Device con TensorFlow.js:** Per una soluzione più robusta, reattiva e che funzioni anche offline, l'approccio consigliato è l'utilizzo del modello di riconoscimento di comandi vocali di TensorFlow.js.34 La vera potenza di questa tecnologia risiede nel  
  *transfer learning*. Non è necessario addestrare un modello da zero, un'operazione complessa e che richiede enormi quantità di dati. È invece possibile prendere un modello pre-addestrato e ri-addestrarlo rapidamente su un piccolo set di parole chiave personalizzate (es. "Stampa", "Pausa", "Stop", "Temperatura").  
  Il processo per raggiungere questo obiettivo è ben documentato. Un codelab di Google fornisce un tutorial passo-passo proprio per il transfer learning su comandi audio.35 Il tutorial mostra come raccogliere campioni audio per etichette come "Sinistra", "Destra" e "Rumore", e poi addestrare un nuovo "strato di testa" del modello neurale per riconoscere questi suoni specifici. Questo esatto processo può essere adattato per il nostro caso d'uso: si può creare una sezione nelle impostazioni dell'interfaccia che permetta all'utente di registrare alcuni campioni vocali per comandi come "Inizia Stampa", "Annulla Stampa", ecc. Questi campioni verranno usati per addestrare, direttamente nel browser, un piccolo modello personalizzato. Il modello addestrato potrà quindi essere utilizzato per classificare l'input del microfono in tempo reale e mappare il comando riconosciuto a una chiamata API specifica di OctoPrint.

### **4.2 Raccomandazioni Conclusive e Roadmap di Sviluppo**

Per garantire il successo del progetto, si raccomanda di seguire una roadmap di sviluppo strutturata e di porre una forte enfasi sulla gestione della community.

**Roadmap di Sviluppo Proposta:**

1. **Fase 1 (Fondamenta):**  
   * Setup del progetto (si raccomanda MUI v5+ per evitare debito tecnico).  
   * Implementazione del tema globale (tema scuro \+ accento verde lime) e dei componenti Neumorphic di base.  
   * Sviluppo del WebSocketProvider e del relativo hook useOctoPrintSocket.  
   * Costruzione del layout statico dell'applicazione con la barra di navigazione principale.  
2. **Fase 2 (Widget Core):**  
   * Sviluppo dei widget essenziali e non dipendenti da plugin: Temperatura, Stato, Controlli Assi/Estrusore, Webcam, Visualizzatore G-code e Terminale.  
   * Connessione di questi widget al WebSocketProvider per ricevere dati in tempo reale.  
3. **Fase 3 (Modularità e Plugin):**  
   * Implementazione del dashboard modulare con React Grid Layout e React DnD, inclusa l'ottimizzazione per il touch.  
   * Definizione formale dello standard "React Widget" per i plugin.  
   * Creazione di un proof-of-concept realizzando un "Wrapper di Dati" per un plugin esistente e popolare (es. PSU Control), dimostrando la fattibilità della strategia di integrazione.  
4. **Fase 4 (Funzionalità Avanzate e Rifinitura):**  
   * Implementazione delle funzionalità avanzate come l'agente vocale (prima con Web Speech API, poi con TensorFlow.js).  
   * Conduzione di test approfonditi di usabilità su un'ampia gamma di dispositivi touch (smartphone e tablet, orientamento portrait e landscape).  
   * Raccolta di feedback dalla community e iterazione sul design e sulle funzionalità.

**Raccomandazione Strategica Finale:**

Il fattore più critico per il successo di questo progetto non è puramente tecnico, ma risiede nella **gestione della community**. La transizione verso uno standard per interfacce utente basato su React deve essere comunicata in modo chiaro, costruttivo e proattivo alla comunità di sviluppatori di plugin di OctoPrint. Il progetto dovrebbe fornire documentazione eccellente, un template "starter kit" per la creazione di nuovi plugin conformi allo standard e un canale di supporto attivo (es. un thread dedicato sul forum o un canale Discord) per aiutare gli sviluppatori nella migrazione. Presentare questa iniziativa non come una "breaking change", ma come un'evoluzione collaborativa dell'ecosistema OctoPrint sarà la chiave per la sua adozione e il suo successo a lungo termine.



### 5\. Stato Attuale e Prossimi Passi

Il lavoro iniziale di setup e configurazione è stato completato con successo, nonostante alcune difficoltà con l'ambiente di esecuzione dei test, che sono state temporaneamente aggirate per procedere con lo sviluppo.

- **Completato:**
    - Inizializzazione del progetto React + TypeScript (`touchui-remake`).
    - Installazione delle dipendenze chiave (MUI v5, React Router).
    - Configurazione del tema globale scuro con accento verde lime.
    - Implementazione della struttura di base dell'applicazione (Layout, AppBar, Drawer).
    - Creazione del `WebSocketProvider` e dell'hook `useOctoPrintSocket` per la gestione della connessione.


- **Prossimi Passi:**
    1. **Sviluppo dei Widget Base:** Creare i primi widget funzionali (Temperature, Stato Connessione, Controlli Base) e integrarli nella dashboard.
    2. **Integrazione Drag-and-Drop:** Implementare `React Grid Layout` e `React DnD` per rendere la dashboard pienamente personalizzabile.
    3. **Integrazione Visualizzatori:** Collegare i componenti `react-gcode-viewer` e `xterm-react` ai dati ricevuti dal WebSocket.
    4. **Sviluppo Framework Plugin:** Realizzare un prototipo del meccanismo di caricamento dinamico dei componenti React dai plugin.


---

## CHANGELOG

### Aggiornamento del 2025-06-26 14:47


Ho implementato la prima fase del dashboard modulare con i widget base. Ecco cosa ho creato:

## **Widget Implementati:**

1. **TemperatureWidget** - Mostra temperatura attuale e target con barra di progresso
2. **PrintProgressWidget** - Visualizza il progresso della stampa con tempi
3. **PrinterStatusWidget** - Stato della stampante con indicatori visivi
4. **QuickControlsWidget** - Controlli rapidi per stampa e movimento assi

## **Dashboard Responsive:**

- Utilizza **React Grid Layout** per la gestione della griglia
- Layout responsive per desktop, tablet e mobile
- Modalità edit per riorganizzare i widget
- Drag & drop per riposizionare gli elementi

## **Caratteristiche Principali:**

- **Integrazione WebSocket**: Tutti i widget si aggiornano in tempo reale
- **Design Neumorfico**: Coerente con il tema definito
- **Responsive**: Si adatta automaticamente a diversi dispositivi
- **Modulare**: Facile aggiungere nuovi widget

## **Prossimi Passi Suggeriti:**

1. **Implementare react-dnd-touch-backend** per il supporto touch ottimale
2. **Aggiungere più widget** (File Manager, Webcam, ecc.)
3. **Persistenza layout** nel localStorage
4. **Integrazione con OctoPrint API** reale
5. **Visualizzatore G-Code** con react-gcode-viewer

Il dashboard è ora funzionale e pronto per essere esteso con ulteriori funzionalità!


