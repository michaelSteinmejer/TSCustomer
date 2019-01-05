import axios, {
  AxiosError,
  AxiosResponse
} from "../../node_modules/axios/index";

interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  year: string;
}

interface IOrders {
  orderId: number;
  orderDescription: string;
  KundeId: number;
}
let uri: string = "https://localhost:44350/api/customer";
// let uri: string = "http://mscustomer.azurewebsites.net/api/customer";
// let uri: string = "http://localhost:63152/api/customer/";
let uri2: string = "http://mscustomer.azurewebsites.net/api/orders";

let oList: HTMLUListElement = document.getElementById(
  "Orderlist"
) as HTMLUListElement;
let List: HTMLUListElement = document.getElementById(
  "list"
) as HTMLUListElement;
let GetButton: HTMLButtonElement = document.getElementById(
  "GetButton"
) as HTMLButtonElement;
let GetAButton: HTMLButtonElement = document.getElementById(
  "GetAButton"
) as HTMLButtonElement;
let AddButton: HTMLButtonElement = document.getElementById(
  "AddButton"
) as HTMLButtonElement;
let DeleteButton: HTMLButtonElement = document.getElementById(
  "DeleteButton"
) as HTMLButtonElement;
let UpdateButton: HTMLButtonElement = document.getElementById(
  "UpdateButton"
) as HTMLButtonElement;
let Get: HTMLButtonElement = document.getElementById(
  "GET"
) as HTMLButtonElement;

let InputId: HTMLInputElement = document.getElementById(
  "Id"
) as HTMLInputElement;
let InputFirstName: HTMLInputElement = document.getElementById(
  "FirstName"
) as HTMLInputElement;
let InputLastName: HTMLInputElement = document.getElementById(
  "LastName"
) as HTMLInputElement;
let InputYear: HTMLInputElement = document.getElementById(
  "Year"
) as HTMLInputElement;
let InputKundeId: HTMLInputElement = document.getElementById(
  "KundeId"
) as HTMLInputElement;
let InputSearch: HTMLInputElement = document.getElementById(
  "InputSearch"
) as HTMLInputElement;

// var items = document.querySelectorAll("#list li span"), tab = [], LiIndex;

Get.addEventListener("click", GetAllOrders);
InputSearch.addEventListener("change", SearchFunction);
GetAButton.addEventListener("click", DisplayACustomer);
GetButton.addEventListener("click", DisplayAllCustomers);
AddButton.addEventListener("click", AddCustomers);
DeleteButton.addEventListener("click", DeleteCustomers);
UpdateButton.addEventListener("click", UpdateCustomer);
// InputFirstName.addEventListener("click",getEventTarget)

function GetAllOrders(): void {
  oList.innerText = "";
  oList.innerHTML = "";
  let addKundeId: number = +InputKundeId.value;
  axios
    .get<IOrders[]>(uri + addKundeId)
    .then(
      (response: AxiosResponse<IOrders[]>): void => {
        response.data.forEach((Order: IOrders) => {
          if (Order == null) {
          } else {
            console.log(Order);
            const node = document.createElement("li") as HTMLLIElement;

            node.appendChild(
              document.createTextNode(
                `${Order.orderId} ${Order.orderDescription} ${Order.KundeId}`
              )
            );
            oList.appendChild(node);
          }
        });
      }
    )
    .catch(
      (error: AxiosError): void => {
        oList.innerHTML = error.message;
        console.log(error.message);
      }
    );
}

function SearchFunction(): void {
  List.innerHTML = "";

  axios
    .get<ICustomer[]>(uri)
    .then(
      (response: AxiosResponse<ICustomer[]>): void => {
        response.data.forEach((customer: ICustomer) => {
          if (customer == null) {
          } else {
            if (
              InputSearch.value
                .toLowerCase()
                .match(customer.firstName.toLowerCase()) ||
              InputSearch.value
                .toLowerCase()
                .match(customer.lastName.toLowerCase()) ||
              InputSearch.value == customer.year
            ) {
              const node = document.createElement("li") as HTMLLIElement;
              var dataSpan = document.createElement("span") as HTMLSpanElement;
              var dataSpan2 = document.createElement("span") as HTMLSpanElement;
              var dataSpan3 = document.createElement("span") as HTMLSpanElement;
              var dataSpan4 = document.createElement("span") as HTMLSpanElement;

              dataSpan.appendChild(document.createTextNode(`${customer.id}`));
              dataSpan2.appendChild(
                document.createTextNode(`${customer.firstName}`)
              );
              dataSpan3.appendChild(
                document.createTextNode(`${customer.lastName}`)
              );
              dataSpan4.appendChild(
                document.createTextNode(`${customer.year}`)
              );
              node.appendChild(dataSpan);
              node.appendChild(dataSpan2);
              node.appendChild(dataSpan3);
              node.appendChild(dataSpan4);

              // node.appendChild(document.createTextNode(`${customer.id} ${customer.firstName} ${customer.lastName} ${customer.year}`));
              List.appendChild(node);
            }
          }
        });
      }
    )
    .catch(
      (error: AxiosError): void => {
        List.innerHTML = error.message;
        console.log(error.message);
      }
    );
}

function DisplayAllCustomers(): void {
  List.innerHTML = "";
  axios
    .get<ICustomer[]>(uri)
    .then(
      (response: AxiosResponse<ICustomer[]>): void => {
        response.data.forEach((customer: ICustomer) => {
          if (customer == null) {
          } else {
            const node = document.createElement("li") as HTMLLIElement;
            var dataSpan = document.createElement("span") as HTMLSpanElement;
            var dataSpan2 = document.createElement("span") as HTMLSpanElement;
            var dataSpan3 = document.createElement("span") as HTMLSpanElement;
            var dataSpan4 = document.createElement("span") as HTMLSpanElement;

            dataSpan.appendChild(document.createTextNode(`${customer.id}`));
            dataSpan2.appendChild(
              document.createTextNode(`${customer.firstName}`)
            );
            dataSpan3.appendChild(
              document.createTextNode(`${customer.lastName}`)
            );
            dataSpan4.appendChild(document.createTextNode(`${customer.year}`));
            node.appendChild(dataSpan);
            node.appendChild(dataSpan2);
            node.appendChild(dataSpan3);
            node.appendChild(dataSpan4);

            // node.appendChild(document.createTextNode(`${customer.id} ${customer.firstName} ${customer.lastName} ${customer.year}`));
            List.appendChild(node);
          }
        });
      }
    )
    .catch(
      (error: AxiosError): void => {
        List.innerHTML = error.message;
        console.log(error.message);
      }
    );
}

function AddCustomers(): void {
  let AddFirstName: string = InputFirstName.value;
  let AddLastName: string = InputLastName.value;
  let AddYear: number = +InputYear.value;

  axios
    .post(uri, {
      firstName: AddFirstName,
      lastName: AddLastName,
      year: AddYear
    })
    .then((response: AxiosResponse<ICustomer[]>) => {
      console.log(
        "response" +
          response.status +
          "responsestatustext" +
          response.statusText
      );
    })
    .then(() => {
      DisplayAllCustomers();
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
    });

  InputFirstName.value = "";
  InputLastName.value = "";
  InputYear.value = "";
}

function DeleteCustomers(): void {
  let InputId: HTMLInputElement = document.getElementById(
    "Id"
  ) as HTMLInputElement;
  let DeleteId: string = InputId.value;

  axios
    .delete(uri + "/" + DeleteId)
    .then(error => {
      console.log(error);
    })
    .then(() => {
      DisplayAllCustomers();
    });

  InputId.value = "";
  InputFirstName.value = "";
  InputLastName.value = "";
  InputYear.value = "";
}

function UpdateCustomer(): void {
  let SelectUpdateId: number = +InputId.value;
  let UpdateFirstName: string = InputFirstName.value;
  let UpdateLastName: string = InputLastName.value;
  let UpdateYear: number = +InputYear.value;

  axios
    .put(uri + "/" + SelectUpdateId, {
      firstName: UpdateFirstName,
      lastName: UpdateLastName,
      year: UpdateYear
    })
    .then(() => {
      DisplayAllCustomers();
    });

  InputId.value = "";
  InputFirstName.value = "";
  InputLastName.value = "";
  InputYear.value = "";
}

function DisplayACustomer(): void {
  let addInput = InputId.value;

  axios.get<ICustomer>(uri + "/" + addInput).then(
    (response: AxiosResponse<ICustomer>): void => {
      List.innerHTML = "";
      let customer: ICustomer = <ICustomer>response.data;
      const node = document.createElement("li") as HTMLLIElement;
      var dataSpan = document.createElement("span") as HTMLSpanElement;
      var dataSpan2 = document.createElement("span") as HTMLSpanElement;
      var dataSpan3 = document.createElement("span") as HTMLSpanElement;
      var dataSpan4 = document.createElement("span") as HTMLSpanElement;

      dataSpan.appendChild(document.createTextNode(`${customer.id}`));
      dataSpan2.appendChild(document.createTextNode(`${customer.firstName}`));
      dataSpan3.appendChild(document.createTextNode(`${customer.lastName}`));
      dataSpan4.appendChild(document.createTextNode(`${customer.year}`));
      node.appendChild(dataSpan);
      node.appendChild(dataSpan2);
      node.appendChild(dataSpan3);
      node.appendChild(dataSpan4);
      List.appendChild(node);
    }
  );
}
