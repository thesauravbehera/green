graph TD
    %% Global Styles
    classDef category fill:#fff,stroke:#333,stroke-width:2px,font-weight:bold;
    classDef main fill:#ffff00,stroke:#333,stroke-width:2px,color:#000;
    classDef leaf fill:#ffe4b5,stroke:#333,stroke-width:1px,color:#000;

    %% 1. FRONTEND DEVELOPMENT
    subgraph Frontend ["Frontend Development"]
        UI[User Interface Design]:::main
        CSL[Client Side Logic]:::main
        
        UI_L1[React framework fundamentals]:::leaf --- UI
        UI_L2[Routing configurations]:::leaf --- UI
        UI --- UI_R1[Component architecture]:::leaf
        UI --- UI_R2[Responsive layout strategies]:::leaf
        UI --- UI_R3[Accessibility standards]:::leaf
        
        CSL_L1[Form validation schemas]:::leaf --- CSL
        CSL_L2[API integration methods]:::leaf --- CSL
        CSL_L3[Authentication flow management]:::leaf --- CSL
        CSL_L4[Client side caching]:::leaf --- CSL
        CSL --- CSL_R1[Design system implementation]:::leaf
        CSL --- CSL_R2[State management patterns]:::leaf
        CSL --- CSL_R3[User experience testing]:::leaf
    end

    %% 2. BACKEND INFRASTRUCTURE
    subgraph Backend ["Backend Infrastructure"]
        SA[Server Architecture]:::main
        DM[Database Modeling]:::main
        
        SA_L1[Relational schema design]:::leaf --- SA
        SA_L2[Document store organization]:::leaf --- SA
        SA --- SA_R1[Node runtime environment]:::leaf
        SA --- SA_R2[RESTful API design]:::leaf
        SA --- SA_R3[GraphQL query implementation]:::leaf
        
        DM_L1[User profile entities]:::leaf --- DM
        DM_L2[Plant care datasets]:::leaf --- DM
        DM_L3[Marketplace transaction logs]:::leaf --- DM
        DM_L4[Social post indexing]:::leaf --- DM
        DM --- DM_R1[Request middleware handling]:::leaf
        DM --- DM_R2[Database connection pooling]:::leaf
        DM --- DM_R3[Environment variable security]:::leaf
    end

    %% 3. REALTIME FUNCTIONALITY
    subgraph Realtime ["Realtime Functionality"]
        WS[WebSocket Integration]:::main
        NS[Notification Systems]:::main
        
        WS_L1[Trigger based alerts]:::leaf --- WS
        WS_L2[Push notification services]:::leaf --- WS
        WS --- WS_R1[Socket event management]:::leaf
        WS --- WS_R2[Connection lifecycle handling]:::leaf
        WS --- WS_R3[Namespace organization]:::leaf
        
        NS_L1[Email dispatching queues]:::leaf --- NS
        NS_L2[Read status tracking]:::leaf --- NS
        NS_L3[Realtime UI updates]:::leaf --- NS
        NS_L4[Message delivery confirmation]:::leaf --- NS
        NS --- NS_R1[Room based messaging]:::leaf
        NS --- NS_R2[Message broadcasting logic]:::leaf
        NS --- NS_R3[Latency optimization techniques]:::leaf
    end

    %% 4. COMMUNITY & MEDIA
    subgraph Community ["Community & Media"]
        SI[Social Interaction]:::main
        MM[Media Management]:::main
        
        SI_L1[Image upload processing]:::leaf --- SI
        SI_L2[Cloud storage integration]:::leaf --- SI
        SI --- SI_R1[User feed generation]:::leaf
        SI --- SI_R2[Post creation flow]:::leaf
        SI --- SI_R3[Like interaction logic]:::leaf
        
        MM_L1[File transformation pipelines]:::leaf --- MM
        MM_L2[Content moderation filtering]:::leaf --- MM
        MM_L3[Thumbnail generation tasks]:::leaf --- MM
        MM_L4[Metadata extraction processes]:::leaf --- MM
        MM --- MM_R1[Comment threading systems]:::leaf
        MM --- MM_R2[User profile personalization]:::leaf
        MM --- MM_R3[Follower network mechanics]:::leaf
    end

    %% 5. MARKETPLACE
    subgraph Marketplace ["Marketplace Ecosystem"]
        PC[Product Catalog]:::main
        TP[Transaction Processing]:::main
        
        PC_L1[Payment gateway connectivity]:::leaf --- PC
        PC_L2[Secure checkout flow]:::leaf --- PC
        PC --- PC_R1[Product inventory management]:::leaf
        PC --- PC_R2[Category classification logic]:::leaf
        PC --- PC_R3[Search filter implementation]:::leaf
        
        TP_L1[Order status tracking]:::leaf --- TP
        TP_L2[Refund request processing]:::leaf --- TP
        TP_L3[Receipt generation tasks]:::leaf --- TP
        TP_L4[Tax calculation logic]:::leaf --- TP
        TP --- TP_R1[Pricing display formatting]:::leaf
        TP --- TP_R2[Stock level tracking]:::leaf
        TP --- TP_R3[Vendor verification workflows]:::leaf
    end

    %% 6. DATA VISUALIZATION
    subgraph Visualization ["Data Visualization"]
        PGM[Plant Growth Metrics]:::main
        EM[Environmental Monitoring]:::main
        
        PGM_L1[Sensor data ingestion]:::leaf --- PGM
        PGM_L2[Humidity level reporting]:::leaf --- PGM
        PGM --- PGM_R1[Chart rendering libraries]:::leaf
        PGM --- PGM_R2[Time series data processing]:::leaf
        PGM --- PGM_R3[Sunlight exposure tracking]:::leaf
        
        EM_L1[Temperature trend visualization]:::leaf --- EM
        EM_L2[Soil nutrient monitoring]:::leaf --- EM
        EM_L3[Anomaly detection alerts]:::leaf --- EM
        EM_L4[Historical trend filtering]:::leaf --- EM
        EM --- EM_R1[Watering schedule logging]:::leaf
        EM --- EM_R2[Growth rate analysis]:::leaf
        EM --- EM_R3[Yield prediction algorithms]:::leaf
    end

    %% 7. SECURITY
    subgraph Security ["Security Measures"]
        AS[Authentication Security]:::main
        DP[Data Protection]:::main
        
        AS_L1[Input sanitization methods]:::leaf --- AS
        AS_L2[Cross site scripting prevention]:::leaf --- AS
        AS --- AS_R1[Token based session management]:::leaf
        AS --- AS_R2[Password hashing algorithms]:::leaf
        AS --- AS_R3[Multi factor authentication]:::leaf
        
        DP_L1[Database injection shielding]:::leaf --- DP
        DP_L2[Secure cookie configuration]:::leaf --- DP
        DP_L3[Data encryption standards]:::leaf --- DP
        DP_L4[Rate limiting implementation]:::leaf --- DP
        DP --- DP_R1[OAuth provider integration]:::leaf
        DP --- DP_R2[Role based access control]:::leaf
        DP --- DP_R3[Security audit logging]:::leaf
    end

    %% 8. PERFORMANCE
    subgraph Performance ["Performance Optimization"]
        AL[Asset Loading]:::main
        SE[Server Efficiency]:::main
        
        AL_L1[Database query indexing]:::leaf --- AL
        AL_L2[Request payload minification]:::leaf --- AL
        AL --- AL_R1[Image compression techniques]:::leaf
        AL --- AL_R2[Lazy loading implementation]:::leaf
        AL --- AL_R3[Code splitting strategies]:::leaf
        
        SE_L1[Server side rendering]:::leaf --- SE
        SE_L2[Response time monitoring]:::leaf --- SE
        SE_L3[Memory leak detection]:::leaf --- SE
        SE_L4[Load balancing configuration]:::leaf --- SE
        SE --- SE_R1[Bundle size reduction]:::leaf
        SE --- SE_R2[Browser caching policies]:::leaf
        SE --- SE_R3[Content delivery network usage]:::leaf
    end

    %% 9. DEPLOYMENT
    subgraph Deployment ["Deployment Strategies"]
        IS[Infrastructure Setup]:::main
        MT[Monitoring Tools]:::main
        
        IS_L1[Error tracking services]:::leaf --- IS
        IS_L2[Log aggregation systems]:::leaf --- IS
        IS --- IS_R1[Cloud hosting platform]:::leaf
        IS --- IS_R2[Container orchestration basics]:::leaf
        IS --- IS_R3[Domain name configuration]:::leaf
        
        MT_L1[Uptime status reporting]:::leaf --- MT
        MT_L2[Performance diagnostic dashboards]:::leaf --- MT
        MT_L3[User feedback loop integration]:::leaf --- MT
        MT_L4[Resource utilization tracking]:::leaf --- MT
        MT --- MT_R1[Secure socket layer setup]:::leaf
        MT --- MT_R2[Automated deployment pipelines]:::leaf
        MT --- MT_R3[Environment staging workflows]:::leaf
    end

    %% 10. GROWTH & PLANNING
    subgraph Growth ["Growth Integration"]
        AR[Automated Reminders]:::main
        SP[Seasonal Planning]:::main
        
        AR_L1[Crop rotation guidance]:::leaf --- AR
        AR_L2[Planting calendar generation]:::leaf --- AR
        AR --- AR_R1[Task scheduling logic]:::leaf
        AR --- AR_R2[Push notification triggers]:::leaf
        AR --- AR_R3[Calendar synchronization features]:::leaf
        
        SP_L1[Regional climate adaptation]:::leaf --- SP
        SP_L2[Soil preparation checklists]:::leaf --- SP
        SP_L3[Harvesting schedule alerts]:::leaf --- SP
        SP_L4[Pest control documentation]:::leaf --- SP
        SP --- SP_R1[Recurring event management]:::leaf
        SP --- SP_R2[User preference settings]:::leaf
        SP --- SP_R3[Priority level assignment]:::leaf
    end

    %% 11. ADVANCED FEATURES
    subgraph Advanced ["Advanced Features"]
        AIR[AI Recommendations]:::main
        SG[Social Gamification]:::main
        
        AIR_L1[Achievement badge system]:::leaf --- AIR
        AIR_L2[User ranking algorithms]:::leaf --- AIR
        AIR --- AIR_R1[Plant species identification]:::leaf
        AIR --- AIR_R2[Nutrient deficiency analysis]:::leaf
        AIR --- AIR_R3[Personalized care advice]:::leaf
        
        SG_L1[Community challenge hosting]:::leaf --- SG
        SG_L2[Leaderboard display logic]:::leaf --- SG
        SG_L3[Reward point accumulation]:::leaf --- SG
        SG_L4[Shareable milestone graphics]:::leaf --- SG
        SG --- SG_R1[Optimal spacing calculation]:::leaf
        SG --- SG_R2[Companion planting suggestions]:::leaf
        SG --- SG_R3[Predictive climate modeling]:::leaf
    end

    %% 12. MAINTENANCE
    subgraph Maintenance ["Maintenance Protocols"]
        DH[Database Hygiene]:::main
        SS[System Scaling]:::main
        
        DH_L1[Vertical scaling considerations]:::leaf --- DH
        DH_L2[Horizontal scaling mechanisms]:::leaf --- DH
        DH --- DH_R1[Index optimization routines]:::leaf
        DH --- DH_R2[Orphaned data cleanup]:::leaf
        DH --- DH_R3[Backup restoration testing]:::leaf
        
        SS_L1[Cache invalidation logic]:::leaf --- SS
        SS_L2[Distributed system monitoring]:::leaf --- SS
        SS_L3[Latency bottleneck identification]:::leaf --- SS
        SS_L4[High availability configuration]:::leaf --- SS
        SS --- SS_R1[Data retention policies]:::leaf
        SS --- SS_R2[Log rotation strategies]:::leaf
        SS --- SS_R3[Schema migration management]:::leaf
    end

    %% Connecting Sections
    Frontend --> Backend --> Realtime --> Community --> Marketplace --> Visualization --> Security --> Performance --> Deployment --> Growth --> Advanced --> Maintenance