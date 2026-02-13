export interface Flashcard {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface QuizQuestion {
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctIndex: number;
}

export interface Lecture {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
  summaryAr: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  color: string;
  icon: string;
  levelTag: string;
  lectures: Lecture[];
}

export interface Level {
  id: string;
  tag: string;
  name: string;
  nameAr: string;
  subjects: Subject[];
}

export const levels: Level[] = [
  {
    id: 'level-1',
    tag: 'Level-1',
    name: 'Level 1',
    nameAr: 'المستوى ١',
    subjects: [],
  },
  {
    id: 'level-2',
    tag: 'Level-2',
    name: 'Level 2',
    nameAr: 'المستوى ٢',
    subjects: [
      {
        id: 'web-info-systems',
        name: 'Web Information Systems',
        nameAr: 'نظم معلومات الويب',
        color: 'subject-webinfo',
        icon: 'Globe',
        levelTag: 'Level-2',
        lectures: [],
      },
      {
        id: 'ecommerce',
        name: 'Fundamentals of E-Commerce',
        nameAr: 'أساسيات التجارة الإلكترونية',
        color: 'subject-ecommerce',
        icon: 'ShoppingCart',
        levelTag: 'Level-2',
        lectures: [
          {
            id: 'ecom-lec-2',
            title: 'Lecture 2: E-Commerce Infrastructure',
            titleAr: 'المحاضرة ٢: البنية التحتية للتجارة الإلكترونية',
            summary: `## E-Commerce Infrastructure

### Hardware
- **Servers**: The backbone of any e-commerce operation, responsible for hosting websites, processing transactions, and storing data.
- **Data Centers**: Facilities that house servers and networking equipment, providing the physical infrastructure for e-commerce.

### Software
- **E-Commerce Platforms**: Tools like **Shopify** and **Magento** that allow businesses to build and manage online stores.
- **CRM Systems**: Customer Relationship Management tools like **Salesforce** that help track customer interactions.
- **Content Management Systems**: Software for managing digital content (e.g., WordPress).

### Networks & Cloud Computing
- **Cloud Computing**: On-demand delivery of IT resources over the Internet (AWS, Azure, Google Cloud).
- **Protocols**: HTTPS ensures secure communication between browsers and servers.
- **CDN (Content Delivery Network)**: Distributes content across global servers to ensure fast load times.

### Payment Technologies
- **Payment Gateways**: Services like **Stripe** and **PayPal** that process online payments securely.
- **Tokenization**: Replacing sensitive payment data with unique tokens for security.
- **Digital Wallets**: Apple Pay, Google Pay — convenient mobile payment methods.

### Security Technologies
- **Firewalls**: Monitor and control incoming/outgoing network traffic.
- **Encryption**: Converting data into code to prevent unauthorized access.
- **SSL/TLS**: Protocols that provide secure communication over computer networks.`,
            summaryAr: `## البنية التحتية للتجارة الإلكترونية

### الأجهزة
- **الخوادم**: العمود الفقري لأي عملية تجارة إلكترونية، مسؤولة عن استضافة المواقع ومعالجة المعاملات وتخزين البيانات.
- **مراكز البيانات**: مرافق تحتضن الخوادم ومعدات الشبكات.

### البرمجيات
- **منصات التجارة الإلكترونية**: أدوات مثل **Shopify** و **Magento** تتيح بناء وإدارة المتاجر الإلكترونية.
- **أنظمة إدارة العملاء**: أدوات مثل **Salesforce** لتتبع تفاعلات العملاء.

### الشبكات والحوسبة السحابية
- **الحوسبة السحابية**: توفير موارد تقنية عبر الإنترنت حسب الطلب.
- **البروتوكولات**: HTTPS يضمن الاتصال الآمن.
- **شبكة توصيل المحتوى (CDN)**: توزع المحتوى عبر خوادم عالمية لضمان سرعة التحميل.

### تقنيات الدفع
- **بوابات الدفع**: خدمات مثل **Stripe** و **PayPal** لمعالجة المدفوعات.
- **الترميز (Tokenization)**: استبدال بيانات الدفع الحساسة برموز فريدة للأمان.

### تقنيات الأمان
- **جدران الحماية**: مراقبة حركة الشبكة.
- **التشفير**: تحويل البيانات إلى رموز لمنع الوصول غير المصرح به.
- **SSL/TLS**: بروتوكولات توفر اتصالاً آمناً.`,
            flashcards: [
              {
                question: 'What is a CDN?',
                questionAr: 'ما هي شبكة توصيل المحتوى (CDN)؟',
                answer: 'Content Delivery Network — distributes content globally to ensure fast load times.',
                answerAr: 'شبكة توصيل المحتوى — توزع المحتوى عالمياً لضمان سرعة التحميل.',
              },
              {
                question: 'What is Tokenization?',
                questionAr: 'ما هو الترميز (Tokenization)؟',
                answer: 'Replacing sensitive payment data with unique tokens for security.',
                answerAr: 'استبدال بيانات الدفع الحساسة برموز فريدة للأمان.',
              },
              {
                question: 'What is SSL/TLS?',
                questionAr: 'ما هو SSL/TLS؟',
                answer: 'Protocols that provide secure communication over computer networks.',
                answerAr: 'بروتوكولات توفر اتصالاً آمناً عبر شبكات الحاسوب.',
              },
            ],
            quiz: [
              {
                question: 'Which of the following is an e-commerce platform?',
                questionAr: 'أي مما يلي يعتبر منصة تجارة إلكترونية؟',
                options: ['Salesforce', 'Shopify', 'AWS', 'PayPal'],
                optionsAr: ['Salesforce', 'Shopify', 'AWS', 'PayPal'],
                correctIndex: 1,
              },
              {
                question: 'What does a CDN do?',
                questionAr: 'ما وظيفة شبكة توصيل المحتوى؟',
                options: [
                  'Processes payments',
                  'Manages customer relationships',
                  'Distributes content globally for fast load times',
                  'Encrypts data',
                ],
                optionsAr: [
                  'معالجة المدفوعات',
                  'إدارة علاقات العملاء',
                  'توزيع المحتوى عالمياً لسرعة التحميل',
                  'تشفير البيانات',
                ],
                correctIndex: 2,
              },
              {
                question: 'What is tokenization used for in e-commerce?',
                questionAr: 'ما استخدام الترميز في التجارة الإلكترونية؟',
                options: [
                  'Speeding up websites',
                  'Replacing sensitive payment data with tokens',
                  'Managing inventory',
                  'Sending marketing emails',
                ],
                optionsAr: [
                  'تسريع المواقع',
                  'استبدال بيانات الدفع الحساسة برموز',
                  'إدارة المخزون',
                  'إرسال رسائل تسويقية',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'os-security',
        name: 'Operating Systems & Security',
        nameAr: 'أنظمة التشغيل والأمان',
        color: 'subject-os',
        icon: 'Shield',
        levelTag: 'Level-2',
        lectures: [
          {
            id: 'os-lec-1',
            title: 'Lecture 1: Introduction to Operating Systems',
            titleAr: 'المحاضرة ١: مقدمة في أنظمة التشغيل',
            summary: `## Introduction to Operating Systems

### What is an Operating System?
An **Operating System (OS)** acts as an intermediary between the user and the computer hardware. It manages hardware resources and provides services for application programs.

### Four Components of a Computer System
1. **Hardware** — CPU, memory, I/O devices
2. **Operating System** — Controls and coordinates hardware use
3. **Application Programs** — Define how system resources are used (word processors, compilers, web browsers)
4. **Users** — People, machines, or other computers

### The Kernel
The **kernel** is the one program running at all times on the computer (all else being system or application programs). It is the core of the OS.

### Bootstrap Program
The **bootstrap program** is firmware stored in ROM/EEPROM that initializes all aspects of the system and loads the OS kernel into memory.

### System Calls
**System calls** provide the interface between a running program and the operating system. They are the way programs request services from the OS kernel.

### Key Concepts
- **Multiprogramming**: Keeps multiple jobs in memory simultaneously so the CPU always has something to execute.
- **Timesharing (Multitasking)**: CPU switches between jobs so frequently that users can interact with each program while it's running.
- **Dual-mode Operation**: Hardware provides at least two modes — **User mode** and **Kernel mode** — to protect the OS from errant users.`,
            summaryAr: `## مقدمة في أنظمة التشغيل

### ما هو نظام التشغيل؟
**نظام التشغيل** يعمل كوسيط بين المستخدم وأجهزة الحاسوب. يدير موارد الأجهزة ويوفر خدمات لبرامج التطبيقات.

### المكونات الأربعة لنظام الحاسوب
1. **الأجهزة** — المعالج، الذاكرة، أجهزة الإدخال/الإخراج
2. **نظام التشغيل** — يتحكم في استخدام الأجهزة وينسقه
3. **برامج التطبيقات** — تحدد كيفية استخدام موارد النظام
4. **المستخدمون** — أشخاص، آلات، أو حواسيب أخرى

### النواة (Kernel)
**النواة** هي البرنامج الوحيد الذي يعمل في جميع الأوقات على الحاسوب.

### برنامج الإقلاع
**برنامج الإقلاع** هو برنامج ثابت مخزن في ROM يُهيئ جميع أجزاء النظام ويحمّل نواة نظام التشغيل.

### استدعاءات النظام
**استدعاءات النظام** توفر الواجهة بين البرنامج قيد التشغيل ونظام التشغيل.

### مفاهيم أساسية
- **تعدد البرمجة**: يحتفظ بعدة مهام في الذاكرة في وقت واحد.
- **المشاركة الزمنية**: ينتقل المعالج بين المهام بسرعة كبيرة.
- **التشغيل المزدوج**: يوفر الجهاز وضعين — وضع المستخدم ووضع النواة.`,
            flashcards: [
              {
                question: 'What is the Bootstrap program?',
                questionAr: 'ما هو برنامج الإقلاع؟',
                answer: 'Firmware stored in ROM that initializes the system and loads the kernel.',
                answerAr: 'برنامج ثابت مخزن في ROM يهيئ النظام ويحمّل النواة.',
              },
              {
                question: 'What are System Calls?',
                questionAr: 'ما هي استدعاءات النظام؟',
                answer: 'The interface between a running program and the OS.',
                answerAr: 'الواجهة بين البرنامج قيد التشغيل ونظام التشغيل.',
              },
              {
                question: 'What is the Kernel?',
                questionAr: 'ما هي النواة؟',
                answer: 'The one program running at all times on the computer — the core of the OS.',
                answerAr: 'البرنامج الوحيد الذي يعمل في جميع الأوقات — جوهر نظام التشغيل.',
              },
              {
                question: 'What is Dual-mode operation?',
                questionAr: 'ما هو التشغيل المزدوج؟',
                answer: 'Hardware provides User mode and Kernel mode to protect the OS from errant users.',
                answerAr: 'يوفر الجهاز وضع المستخدم ووضع النواة لحماية نظام التشغيل.',
              },
            ],
            quiz: [
              {
                question: 'What does an Operating System act as?',
                questionAr: 'ما دور نظام التشغيل؟',
                options: [
                  'A compiler',
                  'An intermediary between user and hardware',
                  'A web browser',
                  'A database',
                ],
                optionsAr: ['مترجم', 'وسيط بين المستخدم والأجهزة', 'متصفح ويب', 'قاعدة بيانات'],
                correctIndex: 1,
              },
              {
                question: 'Where is the Bootstrap program stored?',
                questionAr: 'أين يُخزّن برنامج الإقلاع؟',
                options: ['Hard Drive', 'RAM', 'ROM/EEPROM', 'Cache'],
                optionsAr: ['القرص الصلب', 'الذاكرة العشوائية', 'ROM/EEPROM', 'الذاكرة المخبئة'],
                correctIndex: 2,
              },
              {
                question: 'What is timesharing?',
                questionAr: 'ما هي المشاركة الزمنية؟',
                options: [
                  'Running one program at a time',
                  'CPU switches between jobs frequently for user interaction',
                  'Sharing files between users',
                  'Dividing memory equally',
                ],
                optionsAr: [
                  'تشغيل برنامج واحد في كل مرة',
                  'ينتقل المعالج بين المهام بسرعة للتفاعل مع المستخدم',
                  'مشاركة الملفات بين المستخدمين',
                  'تقسيم الذاكرة بالتساوي',
                ],
                correctIndex: 1,
              },
            ],
          },
          {
            id: 'os-lec-2',
            title: 'Lecture 2: Processes & Threads',
            titleAr: 'المحاضرة ٢: العمليات والخيوط',
            summary: `## Processes & Threads

### What is a Process?
A **process** is a program in execution. It includes the program code (text section), current activity (program counter, registers), stack, data section, and heap.

### Process States
A process transitions through several states:
1. **New** — The process is being created
2. **Ready** — The process is waiting to be assigned to a processor
3. **Running** — Instructions are being executed
4. **Waiting** — The process is waiting for some event (I/O completion)
5. **Terminated** — The process has finished execution

### Process Control Block (PCB)
The **PCB** contains all information associated with a specific process:
- Process state, Program counter, CPU registers
- CPU scheduling information, Memory management information
- Accounting information, I/O status information

### Context Switch
A **context switch** occurs when the CPU switches from one process to another. The system saves the state of the old process in its PCB and loads the saved state for the new process.

### Scheduling Queues
- **Job Queue**: Set of all processes in the system
- **Ready Queue**: Processes in main memory, ready and waiting to execute
- **Device Queues**: Processes waiting for a particular I/O device

### Threads
A **thread** is a basic unit of CPU utilization. A process can contain multiple threads, each with its own:
- Thread ID, Program counter, Register set, Stack

### Multithreading Models
- **Many-to-One**: Multiple user threads map to one kernel thread
- **One-to-One**: Each user thread maps to a kernel thread
- **Many-to-Many**: Many user threads map to many kernel threads`,
            summaryAr: `## العمليات والخيوط

### ما هي العملية؟
**العملية** هي برنامج قيد التنفيذ. تتضمن رمز البرنامج والنشاط الحالي والمكدس وقسم البيانات.

### حالات العملية
1. **جديدة** — يتم إنشاء العملية
2. **جاهزة** — تنتظر تعيينها لمعالج
3. **قيد التشغيل** — يتم تنفيذ التعليمات
4. **منتظرة** — تنتظر حدثاً ما
5. **منتهية** — أنهت التنفيذ

### كتلة التحكم في العملية (PCB)
تحتوي على جميع المعلومات المرتبطة بعملية معينة: حالة العملية، عداد البرنامج، سجلات المعالج، معلومات الجدولة.

### تبديل السياق
يحدث عندما ينتقل المعالج من عملية إلى أخرى. يحفظ النظام حالة العملية القديمة ويحمل حالة العملية الجديدة.

### طوابير الجدولة
- **طابور المهام**: جميع العمليات في النظام
- **طابور الجاهزية**: العمليات الجاهزة للتنفيذ
- **طوابير الأجهزة**: العمليات المنتظرة لجهاز معين

### الخيوط
**الخيط** هو الوحدة الأساسية لاستخدام المعالج. يمكن للعملية أن تحتوي على عدة خيوط.

### نماذج تعدد الخيوط
- **متعدد إلى واحد**: عدة خيوط مستخدم تُعيّن لخيط نواة واحد
- **واحد إلى واحد**: كل خيط مستخدم يُعيّن لخيط نواة
- **متعدد إلى متعدد**: عدة خيوط مستخدم تُعيّن لعدة خيوط نواة`,
            flashcards: [
              {
                question: 'What is a Thread?',
                questionAr: 'ما هو الخيط؟',
                answer: 'A basic unit of CPU utilization; a process can have multiple threads.',
                answerAr: 'الوحدة الأساسية لاستخدام المعالج؛ يمكن للعملية أن تحتوي على عدة خيوط.',
              },
              {
                question: 'Describe the "Ready" state.',
                questionAr: 'صف حالة "الجاهزية".',
                answer: 'The process is waiting to be assigned to a processor.',
                answerAr: 'العملية تنتظر تعيينها لمعالج.',
              },
              {
                question: 'What is a Context Switch?',
                questionAr: 'ما هو تبديل السياق؟',
                answer: 'When the CPU switches from one process to another, saving and loading process states.',
                answerAr: 'عندما ينتقل المعالج من عملية لأخرى، مع حفظ وتحميل حالات العمليات.',
              },
              {
                question: 'What is a PCB?',
                questionAr: 'ما هي كتلة التحكم في العملية؟',
                answer: 'Process Control Block — contains all information associated with a specific process.',
                answerAr: 'كتلة التحكم في العملية — تحتوي على جميع المعلومات المرتبطة بعملية معينة.',
              },
            ],
            quiz: [
              {
                question: 'Which is NOT a process state?',
                questionAr: 'أي مما يلي ليس حالة عملية؟',
                options: ['Ready', 'Running', 'Compiling', 'Waiting'],
                optionsAr: ['جاهزة', 'قيد التشغيل', 'تجميع', 'منتظرة'],
                correctIndex: 2,
              },
              {
                question: 'What does PCB stand for?',
                questionAr: 'ما معنى PCB؟',
                options: [
                  'Program Control Base',
                  'Process Control Block',
                  'Processor Cache Buffer',
                  'Process Command Bus',
                ],
                optionsAr: [
                  'قاعدة تحكم البرنامج',
                  'كتلة التحكم في العملية',
                  'ذاكرة مخبئة للمعالج',
                  'ناقل أوامر العملية',
                ],
                correctIndex: 1,
              },
              {
                question: 'In the One-to-One threading model:',
                questionAr: 'في نموذج واحد إلى واحد:',
                options: [
                  'Many user threads map to one kernel thread',
                  'Each user thread maps to a kernel thread',
                  'All threads share one CPU core',
                  'Threads cannot run concurrently',
                ],
                optionsAr: [
                  'عدة خيوط مستخدم تُعيّن لخيط نواة واحد',
                  'كل خيط مستخدم يُعيّن لخيط نواة',
                  'جميع الخيوط تشترك في نواة واحدة',
                  'لا يمكن للخيوط العمل بشكل متزامن',
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'comp-animation',
        name: 'Computer Animation',
        nameAr: 'الرسوم المتحركة الحاسوبية',
        color: 'subject-animation',
        icon: 'Palette',
        levelTag: 'Level-2',
        lectures: [],
      },
    ],
  },
  {
    id: 'level-3',
    tag: 'Level-3',
    name: 'Level 3',
    nameAr: 'المستوى ٣',
    subjects: [],
  },
  {
    id: 'level-4',
    tag: 'Level-4',
    name: 'Level 4',
    nameAr: 'المستوى ٤',
    subjects: [],
  },
];

export const getAllSubjects = (): Subject[] => {
  return levels.flatMap(l => l.subjects);
};

export const getAllLectures = (): (Lecture & { subjectId: string; subjectName: string; subjectColor: string })[] => {
  return levels.flatMap(l =>
    l.subjects.flatMap(s =>
      s.lectures.map(lec => ({ ...lec, subjectId: s.id, subjectName: s.name, subjectColor: s.color }))
    )
  );
};
