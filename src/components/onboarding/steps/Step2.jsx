import { InputField, SelectField, RadioGroup } from '../FormElements';

const isMissing = (value) => value === undefined || value === null || String(value).trim() === '';

const FieldError = ({ show }) => {
  if (!show) return null;

  return (
    <p className="mt-1 ml-1 text-[12px] text-red-500">
      This field is required.
    </p>
  );
};

export const Step2 = ({ formData, updateDoc }) => {
  const showErrors = Boolean(formData.showErrors);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111]">Fleet Information</h2>
        <p className="text-[14px] text-gray-500 mt-1">Please provide the following information about your fleet:</p>
      </div>

      <div className="space-y-6">
        <div>
          <RadioGroup label="Do you have Prior Limo Services Experience?" name="priorExp" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.priorExp} onChange={(v) => updateDoc('priorExp', v)} />
          <FieldError show={showErrors && isMissing(formData.priorExp)} />
        </div>

        <div>
          <RadioGroup label="Do you have electric vehicles in your fleet?" name="electricVehicles" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.electricVehicles} onChange={(v) => updateDoc('electricVehicles', v)} />
          <FieldError show={showErrors && isMissing(formData.electricVehicles)} />
        </div>

        <div>
          <RadioGroup label="Do you have female chauffeurs?" name="femaleChauffeurs" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.femaleChauffeurs} onChange={(v) => updateDoc('femaleChauffeurs', v)} />
          <FieldError show={showErrors && isMissing(formData.femaleChauffeurs)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
        <div>
          <InputField type="number" label="How many chauffeurs do you have?" placeholder="3" value={formData.chauffeurCount} onChange={(e) => updateDoc('chauffeurCount', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.chauffeurCount)} />
        </div>

        <div>
          <SelectField label="How many first class vehicles do you have?" options={['1-5', '6-10', '11+']} value={formData.firstClassCount} onChange={(e) => updateDoc('firstClassCount', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.firstClassCount)} />
        </div>

        <div>
          <InputField type="number" label="How many business class vans do you have?" placeholder="How many business class vans do you have?" value={formData.businessVansCount} onChange={(e) => updateDoc('businessVansCount', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.businessVansCount)} />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-[14px] text-gray-600 mb-2 ml-1">Describe the vehicles in your fleet (brand, model and year)</label>
        <textarea
          placeholder="Please provide details about the vehicles in your fleet"
          rows="4"
          value={formData.fleetDescription}
          onChange={(e) => updateDoc('fleetDescription', e.target.value)}
          className={`w-full rounded-3xl border bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none ${
            showErrors && isMissing(formData.fleetDescription) ? 'border-red-200' : 'border-gray-200/80'
          }`}
        />
        <FieldError show={showErrors && isMissing(formData.fleetDescription)} />
      </div>
    </div>
  );
};
