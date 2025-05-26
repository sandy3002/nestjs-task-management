> A momdule is defined by annotating a class with the @Module decorator
    >>providers
    >>controllers
    >>exports
    >>imports

>A controller is responsible for handling incoming requests and returning response to the client. Defined by @Controller
    >>bount to path
    >>contain handlers
    >>use dependecy injection

>Handlers are simply methods within the controller class, decorated with decorators such as @Get, @Post, @Delete etc.

>Providers can be injected using @Injectable
>Services are mainly business logic

>DTO : A Data Transfer Object is an object that carires data between objects. It is an object that is used to encapsulate data and send it from one subsystem of an application to another

