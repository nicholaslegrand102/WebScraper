const axios = require('axios').default;
const cheerio = require('cheerio')
const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const url = process.env.URL
const phoneNumber = process.env.PHONE_NUMBER

async function main(){
while (true){

	axios.get(url)
	.then((response)=> {
	  const html = response.data;
	  const $ = cheerio.load(html);
	  const statsTable = $('.default-cart-button > button');
	  
	  if(statsTable.text().includes('Add to Cart'))
	  {
		console.log("available")
		client.messages
 				 .create({
    	 				body: 'The product is available',
    	 				from: '+17435002633',
     					to: phoneNumber
   		}).then(message => console.log(message.sid));
	  }
	  
	})
	await new Promise(r => setTimeout(r, 50000));
	}
}
main()