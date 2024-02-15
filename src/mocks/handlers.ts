// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { FormValueType } from '../Feature/types'
const features: FormValueType[] = [];

export const handlers = [
  http.get('/features', () => {
    // Construct a JSON response with the list of all posts
    // as the response body.
    return HttpResponse.json(features)
  }),
  http.post('/features', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = await request.json() as FormValueType

    // Push the new post to the map of all posts.
    features.push(newPost)
    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!

    return HttpResponse.json(newPost, { status: 201 })
  }),
  http.get('/feature/:id', ({ params }) => {
    const feature = features.find(feature => feature.id === Number(params.id))
    return HttpResponse.json(feature, { status: 201 })
  }),
  http.put('/feature/:id', async ({ request }) => {
    const updatedFeature = await request.json() as FormValueType;
    const index = features.findIndex(feature => feature.id == updatedFeature.id)

    features[index].name = updatedFeature.name;
    features[index].description = updatedFeature.description;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            success: 1
          }, { status: 201 })
        );
      }, 0);
    });
  }),
  http.delete('/feature/:id', ({ params }) => {
    const featureIndex = features.findIndex(feature => feature.id === Number(params.id))
    features.splice(featureIndex, 1);
    return HttpResponse.json({
      status: true
    }, { status: 201 })
  }),
]