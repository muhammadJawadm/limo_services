import { InputField, SelectField, RadioGroup } from '../FormElements';

export const Step2 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Fleet Information</h2>
      <p className="text-[14px] text-gray-500 mt-1">Please provide the following information about your fleet:</p>
    </div>

    <div className="space-y-6">
      <RadioGroup label="Do you have Prior Limo Services Experience?" name="priorExp" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.priorExp} onChange={(v) => updateDoc('priorExp', v)} />
      <RadioGroup label="Do you have electric vehicles in your fleet?" name="electricVehicles" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.electricVehicles} onChange={(v) => updateDoc('electricVehicles', v)} />
      <RadioGroup label="Do you have femaile chauffeurs?" name="femaleChauffeurs" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.femaleChauffeurs} onChange={(v) => updateDoc('femaleChauffeurs', v)} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
      <InputField label="How many chauffeurs do you have?" placeholder="3" value={formData.chauffeurCount} onChange={(e) => updateDoc('chauffeurCount', e.target.value)} />
      <SelectField label="How many first class vehicles do you have?" options={['1-5', '6-10', '11+']} value={formData.firstClassCount} onChange={(e) => updateDoc('firstClassCount', e.target.value)} />

      <InputField label="How many business class vans do you have?" placeholder="How many business class vans do you have?" value={formData.businessVansCount} onChange={(e) => updateDoc('businessVansCount', e.target.value)} />
      <SelectField label="How many business class vans do you have?" options={['1-5', '6-10', '11+']} value={formData.businessVansCount2} onChange={(e) => updateDoc('businessVansCount2', e.target.value)} />
    </div>

    <div className="w-full">
      <label className="block text-[14px] text-gray-600 mb-2 ml-1">Describe the vehicles in your fleet (brand, model and year)</label>
      <textarea
        placeholder="Lorem Ipsum..."
        rows="4"
        value={formData.fleetDescription}
        onChange={(e) => updateDoc('fleetDescription', e.target.value)}
        className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
      ></textarea>
    </div>
  </div>
);
