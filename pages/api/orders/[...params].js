import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET", "POST", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const orderDatails = {
    id: '22815773000169-4818e72f-2304-466f-9fe7-af08f34ac4ed',
    type: 'DELIVERY',
    displayId: '12345',
    createdAt: '2021-05-27T19:38:10.332Z',
    orderTiming: 'INSTANT',
    preparationStartDateTime: '2021-05-27T19:45:10.332Z',
    merchant: {
      id: '77372173000165-A3B4E439-CA11-42BE-A108-F7A0D25322CC',
      name: 'Plaza Pizza',
    },
    items: [
      {
        id: '22815773000169-B558112F-1D1F-40A5-B7DD-ABC3AC142B6E',
        index: 0,
        name: 'Medium - 2 flavors',
        externalCode: '22',
        unit: 'UNIT',
        quantity: 1,
        specialInstructions: 'Do not put onions.',
        unitPrice: {
          value: 43,
          currency: 'R$',
        },
        optionsPrice: {
          value: 50,
          currency: 'R$',
        },
        totalPrice: {
          value: 50,
          currency: 'R$',
        },
        options: [
          {
            id: '22815773000169-B558112F-1D1F-40A5-B7DD-ABC3AC142B6E',
            name: '1/2 Pepperoni',
            externalCode: '23',
            unit: 'UNIT',
            quantity: 1,
            unitPrice: {
              value: 50,
              currency: 'R$',
            },
            price: {
              value: 50,
              currency: 'R$',
            },
            specialInstructions: 'None',
          },
          {
            id: '22815773000169-B558112F-1D1F-40A5-B7DD-ABC3AC142B6E',
            name: '1/2 Mozzarella',
            externalCode: '24',
            unit: 'UNIT',
            quantity: 1,
            unitPrice: {
              value: 30,
              currency: 'R$',
            },
            price: {
              value: 30,
              currency: 'R$',
            },
            specialInstructions: 'None',
          },
        ],
      },
    ],
    otherFees: [
      {
        name: 'Delivery',
        type: 'SERVICE_FEE',
        receivedBy: 'MARKETPLACE',
        receiverDocument: '1234',
        price: {
          value: 5,
          currency: 'R$',
        },
        observation: 'None',
      },
    ],
    discounts: [
      {
        value: 0,
        target: 'DELIVERY_FEE',
        sponsorshipValues: [
          {
            name: 'MARKETPLACE',
            value: 0,
          },
        ],
      },
    ],
    total: {
      itemsPrice: {
        value: 50,
        currency: 'R$',
      },
      otherFees: {
        value: 5,
        currency: 'R$',
      },
      discount: {
        value: 0,
        currency: 'R$',
      },
      orderAmount: {
        value: 55.5,
        currency: 'R$',
      },
    },
    payments: {
      prepaid: 55,
      pending: 0,
      methods: [
        {
          value: 55,
          currency: 'R$',
          type: 'PENDING',
          method: 'FOOD_VOUCHER',
          methodInfo: 'None',
        },
      ],
    },
    customer: {
      id: '22815773000169-d9730653-a8ba-4e85-8dbb-b5697e6ae8d5',
      phone: {
        number: '11999999999',
        extension: '0',
      },
      documentNumber: '12345',
      name: 'John',
      ordersCountOnMerchant: 1,
    },
    delivery: {
      deliveredBy: 'MERCHANT',
      estimatedDeliveryDateTime: '2021-05-27T20:45:10.332Z',
      deliveryAddress: {
        country: 'Brazil',
        streetName: 'Gomes de Carvalho Street',
        formattedAddress: 'string',
        streetNumber: '100',
        city: 'São Paulo',
        postalCode: '20111-000',
        coordinates: {
          latitude: -23.5475,
          longitude: -46.63611,
        },
        neighborhood: 'Moema',
        state: 'SP',
        complement: '102',
        deliveryDateTime: '2021-05-27T20:45:10.332Z',
      },
    },
    extraInfo: 'None',
  };

export default async function handler(req, res) {
    await runMiddleware(req, res, cors)

    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({error: "Method Not Allowed"})    
    }

    const {params} =  req.query

    if (params.length === 1) {
        return res.status(200).json(orderDatails)
    }

    return res.status(200).send()
  }
