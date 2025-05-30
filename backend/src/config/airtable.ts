import Airtable from 'airtable';
import config from './config';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.airtable.apiKey
});

const base = Airtable.base(config.airtable.baseId);

export default base;
