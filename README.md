```mermaid
graph TB
  subgraph User_Interface_Layer
    A1[React.js UI]
    A2[PWA Support]
    A3[Reusable Components]
    A4[Third-party Tools Integration]
  end

  subgraph Backend_Services
    B1[Node.js with Express.js]
    B2[User Management Service]
    B3[Product Management Service]
    B4[Order Processing Service]
    B5[API Gateway]
  end

  subgraph Database_Layer
    C1[MongoDB]
    C2[Elasticsearch]
    C3[Replication for High Availability]
    C4[Optimized Indexing]
  end

  subgraph Real_Time_Communication
    D1[WebSocket with Socket.IO]
    D2[Real-time Notifications]
    D3[Live Chat Support]
  end

  subgraph Cache_Layer
    E1[Redis]
    E2[Session Management]
    E3[Caching Frequently Accessed Data]
  end

  subgraph File_Storage
    F1[AWS S3/Google Cloud Storage]
    F2[Secure File Storage]
    F3[CDN Integration]
  end

  subgraph Security_Layer
    G1[Two-factor Authentication]
    G2[Role-based Access Control]
    G3[SSL/TLS Encryption]
    G4[Web Application Firewall]
  end

  subgraph Queuing_System
    H1[RabbitMQ]
    H2[Asynchronous Task Management]
    H3[Reliable Messaging]
  end

  subgraph DevOps_and_Deployment
    I1[Docker]
    I2[Kubernetes]
    I3[CI/CD Pipelines]
    I4[Autoscaling]
    I5[Monitoring with Prometheus and Grafana]
  end

  A1 --> B5
  B1 --> B5
  B5 --> C1
  B5 --> C2
  B5 --> D1
  D1 --> D2
  D1 --> D3
  B1 --> E1
  E1 --> E2
  E1 --> E3
  B1 --> F1
  F1 --> F2
  F1 --> F3
  B1 --> G1
  B1 --> G2
  B1 --> G3
  B1 --> G4
  B1 --> H1
  H1 --> H2
  H1 --> H3
  I1 --> I2
  I2 --> I3
  I3 --> I4
  I4 --> I5
```
