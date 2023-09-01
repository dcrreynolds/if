import {BoaviztaCpuImpactModel} from '../lib';

/**
 * Pipeline for computing impacts based on observation.
 */
export class ObservationPipeline {
  private observations: any;

  /**
   * Init observations object.
   */
  constructor(observations: any) {
    this.observations = observations;
  }

  /**
   * Apply `boavizta` model computation to observations.
   */
  private async boaviztaHandler(params: any) {
    const modelInstance = await new BoaviztaCpuImpactModel().configure(
      'test',
      params
    );

    const preparedObservations = this.observations.map((observation: any) => ({
      cpu: observation.cpu,
      duration: `${observation.duration}s`,
      datetime: observation.timestamp,
    }));

    const calculatedImpacts = await modelInstance.calculate(
      preparedObservations
    );

    const result = this.observations.map((observation: any, index: number) => ({
      ...observation,
      ...calculatedImpacts[index],
    }));

    this.observations = result;

    return this;
  }

  /**
   * Apply appropriate observation.
   */
  private doObservationsUsing(modelType: string, params: any) {
    switch (modelType) {
      case 'boavizta':
        return this.boaviztaHandler(params);
      // case 'ccf':
      // return this.ccfHandler(params)
    }
  }

  /**
   * Getter for observation data.
   */
  public getObservationsData() {
    return this.observations;
  }

  /**
   * Pipe function which takes model, and returns the observation instance.
   */
  public async pipe(modelType: string, params: any) {
    await this.doObservationsUsing(modelType, params);

    return this;
  }
}
