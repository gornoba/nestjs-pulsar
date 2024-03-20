<p align="center">
<div style="display: flex; justify-content: center; align-items: center;
">
<div>
<a href="http://nestjs.com/" target="blank"><img src="./image/nestjs_logo_icon_169927.png" width="200" alt="Nest Logo" /></a>
</div>
<div>
<a href="http://nestjs.com/" target="blank"><img src="https://pulsar.apache.org/img/logo-black.svg" width="200" alt="Nest Logo" /></a>
</div>
</div>

</p>

## Link

[Michael Guay Apache Pulsar + NestJS Tutorial](https://www.youtube.com/watch?v=qjNYLk-jrX0)
[Apache Pulsar](https://pulsar.apache.org/)
[Pulsar Client Node](https://github.com/apache/pulsar-client-node)

## Kafka와 Pular의 비교

<table >
  <tr style="text-align: center;">
    <td>구분</td>
    <td>Kafka</td>
    <td>Pulsar</td>
  </tr>
  <tr>
    <td style="text-align: center;">아키텍쳐</td>
    <td> - 간단한 브로커-스토리지 아키텍처를 사용.<br />- 데이터의 저장과 전송을 모두 담당<br/> - 설치와 운영이 비교적 간단하지만, 브로커의 부하가 커질 수 있음</td>
    <td>- 분리된 브로커와 북키퍼(BookKeeper) 스토리지 레이어를 사용<br/>- 높은 확장성과 유연성을 제공하며, 브로커와 스토리지 레이어를 독립적으로 확장</td>
  </tr>
  <tr>
    <td style="text-align: center;">성능 및 확장성</td>
    <td>- 고성능을 제공하며, 특히 대량의 데이터를 처리하는데 강점<br/>- but 확장 시 전체 시스템을 재구성해야 할 수도 있음</td>
    <td>- 뛰어난 확장성을 자랑하며, 브로커와 스토리지를 독립적으로 확장할 수 있어 더 유연한 운영이 가능<br/>- 다중 테넌트 지원으로 서로 다른 워크로드를 효율적으로 처리</td>
  </tr>
  <tr>
    <td style="text-align: center;">다중 테넌트 및 지오리플리케이션</td>
    <td>- 다중 테넌트 구성을 지원하지만, Pulsar만큼 직관적이지 않음<br/>- 지오리플리케이션을 위해서는 추가적인 설정과 관리가 필요</td>
    <td>- 네이티브 다중 테넌트 및 지오리플리케이션 기능을 제공<br/>= 이를 통해 글로벌 분산 시스템 구축이 용이하며, 데이터의 지역별 복제와 분산 처리가 간편</td>
  </tr>
  <tr>
    <td style="text-align: center;">메세지 지연</td>
    <td>- 메시지는 로그 형태로 디스크에 저장되며, 컨슈머는 이 로그를 읽어 처리<br/>- 메시지 지연은 주로 네트워크 지연과 스토리지 성능에 의존</td>
    <td>- 옵션으로 메모리에 메시지를 저장할 수 있어, 매우 낮은 지연 시간을 제공<br/>- 이는 실시간 처리가 필요한 애플리케이션에 유리</td>
  </tr>
  <tr>
    <td style="text-align: center;">API 및 클라이언트 지원</td>
    <td>- 자바 클라이언트가 가장 잘 지원되며, 다른 언어로 작성된 클라이언트는 커뮤니티에 의존</td>
    <td>- 특히, 네이티브 지원이 잘되어 있는 것으로 다양한 개발 환경에서의 접근성을 높음</td>
  </tr>
  <tr>
    <td style="text-align: center;">스트리밍 및 메시징 모델</td>
    <td>-  주로 로그 기반의 메시징 모델을 사용하며, 고성능 스트리밍 처리에 초점 이는 대량의 데이터 스트림을 효율적으로 처리</td>
    <td>- 유연한 메시징 모델을 제공하며, 퍼블리시-서브스크라이브(pub-sub) 및 큐 기반 메시징 모델을 모두 지원<br/>- 메시지 기반 애플리케이션과 스트리밍 처리 시나리오 모두에서 사용</td>
  </tr>
  <tr>
    <td style="text-align: center;">지속성 및 내구성</td>
    <td>- 복제 팩터(replication factor)를 설정하여 데이터의 안전성을 보장<br/>- 데이터는 브로커 간에 복제되어 장애가 발생해도 데이터 손실을 방지</td>
    <td>- 북키퍼를 사용하여 메시지의 메타데이터를 관리하고, 북키퍼와 분리된 북스토리지(Bookie) 레이어에서 실제 데이터를 저장<br/>데이터의 높은 내구성과 함께, 장애 복구 시 빠른 데이터 복원을 가능</td>
  </tr>
  <tr>
    <td style="text-align: center;">사용 사례 및 적합성</td>
    <td>- 대량의 데이터 스트림 처리, 로그 수집, 실시간 분석, 이벤트 소싱 등의 사례에 잘 맞음<br/>- 대규모 시스템에서의 확장성과 높은 처리량이 요구되는 환경에서 강점</td>
    <td>- 높은 처리량뿐만 아니라 낮은 지연 시간이 요구되는 실시간 메시징, IoT 데이터 수집, 멀티테넌시를 요구하는 클라우드 서비스 등 다양한 사용 사례에 적합하며 복잡한 메시징 패턴과 글로벌 분산 시스템 구축을 용이</td>
  </tr>
</table>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
