#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct spvDescriptorSetBuffer0
{
    array<texture2d<float>, 4> uSampler0 [[id(0)]];
    array<sampler, 4> uSampler0Smplr [[id(4)]];
    constant uint* spvSwizzleConstants [[id(4294967294)]];
};

struct main0_out
{
    float4 FragColor [[color(0)]];
};

struct main0_in
{
    float2 vUV [[user(locn0)]];
};

enum class spvSwizzle : uint
{
    none = 0,
    zero,
    one,
    red,
    green,
    blue,
    alpha
};

template<typename T> struct spvRemoveReference { typedef T type; };
template<typename T> struct spvRemoveReference<thread T&> { typedef T type; };
template<typename T> struct spvRemoveReference<thread T&&> { typedef T type; };
template<typename T> inline constexpr thread T&& spvForward(thread typename spvRemoveReference<T>::type& x)
{
    return static_cast<thread T&&>(x);
}
template<typename T> inline constexpr thread T&& spvForward(thread typename spvRemoveReference<T>::type&& x)
{
    return static_cast<thread T&&>(x);
}

template<typename T>
inline T spvGetSwizzle(vec<T, 4> x, T c, spvSwizzle s)
{
    switch (s)
    {
        case spvSwizzle::none:
            return c;
        case spvSwizzle::zero:
            return 0;
        case spvSwizzle::one:
            return 1;
        case spvSwizzle::red:
            return x.r;
        case spvSwizzle::green:
            return x.g;
        case spvSwizzle::blue:
            return x.b;
        case spvSwizzle::alpha:
            return x.a;
    }
}

// Wrapper function that swizzles texture samples and fetches.
template<typename T>
inline vec<T, 4> spvTextureSwizzle(vec<T, 4> x, uint s)
{
    if (!s)
        return x;
    return vec<T, 4>(spvGetSwizzle(x, x.r, spvSwizzle((s >> 0) & 0xFF)), spvGetSwizzle(x, x.g, spvSwizzle((s >> 8) & 0xFF)), spvGetSwizzle(x, x.b, spvSwizzle((s >> 16) & 0xFF)), spvGetSwizzle(x, x.a, spvSwizzle((s >> 24) & 0xFF)));
}

template<typename T>
inline T spvTextureSwizzle(T x, uint s)
{
    return spvTextureSwizzle(vec<T, 4>(x, 0, 0, 1), s).x;
}

// Wrapper function that swizzles texture gathers.
template<typename T, typename Tex, typename... Ts>
inline vec<T, 4> spvGatherSwizzle(sampler s, const thread Tex& t, Ts... params, component c, uint sw) METAL_CONST_ARG(c)
{
    if (sw)
    {
        switch (spvSwizzle((sw >> (uint(c) * 8)) & 0xFF))
        {
            case spvSwizzle::none:
                break;
            case spvSwizzle::zero:
                return vec<T, 4>(0, 0, 0, 0);
            case spvSwizzle::one:
                return vec<T, 4>(1, 1, 1, 1);
            case spvSwizzle::red:
                return t.gather(s, spvForward<Ts>(params)..., component::x);
            case spvSwizzle::green:
                return t.gather(s, spvForward<Ts>(params)..., component::y);
            case spvSwizzle::blue:
                return t.gather(s, spvForward<Ts>(params)..., component::z);
            case spvSwizzle::alpha:
                return t.gather(s, spvForward<Ts>(params)..., component::w);
        }
    }
    switch (c)
    {
        case component::x:
            return t.gather(s, spvForward<Ts>(params)..., component::x);
        case component::y:
            return t.gather(s, spvForward<Ts>(params)..., component::y);
        case component::z:
            return t.gather(s, spvForward<Ts>(params)..., component::z);
        case component::w:
            return t.gather(s, spvForward<Ts>(params)..., component::w);
    }
}

// Wrapper function that swizzles depth texture gathers.
template<typename T, typename Tex, typename... Ts>
inline vec<T, 4> spvGatherCompareSwizzle(sampler s, const thread Tex& t, Ts... params, uint sw) 
{
    if (sw)
    {
        switch (spvSwizzle(sw & 0xFF))
        {
            case spvSwizzle::none:
            case spvSwizzle::red:
                break;
            case spvSwizzle::zero:
            case spvSwizzle::green:
            case spvSwizzle::blue:
            case spvSwizzle::alpha:
                return vec<T, 4>(0, 0, 0, 0);
            case spvSwizzle::one:
                return vec<T, 4>(1, 1, 1, 1);
        }
    }
    return t.gather_compare(s, spvForward<Ts>(params)...);
}

float4 sample_in_func_1(thread const array<texture2d<float>, 4> uSampler0, thread const array<sampler, 4> uSampler0Smplr, constant uint32_t* uSampler0Swzl, thread float2& vUV)
{
    return spvTextureSwizzle(uSampler0[2].sample(uSampler0Smplr[2], vUV), uSampler0Swzl[2]);
}

float4 sample_in_func_2(thread float2& vUV, thread texture2d<float> uSampler1, thread const sampler uSampler1Smplr, constant uint32_t& uSampler1Swzl)
{
    return spvTextureSwizzle(uSampler1.sample(uSampler1Smplr, vUV), uSampler1Swzl);
}

float4 sample_single_in_func(thread const texture2d<float> s, thread const sampler sSmplr, constant uint32_t& sSwzl, thread float2& vUV)
{
    return spvTextureSwizzle(s.sample(sSmplr, vUV), sSwzl);
}

fragment main0_out main0(main0_in in [[stage_in]], constant spvDescriptorSetBuffer0& spvDescriptorSet0 [[buffer(0)]], constant uint* spvSwizzleConstants [[buffer(30)]], texture2d<float> uSampler1 [[texture(0)]], sampler uSampler1Smplr [[sampler(0)]])
{
    main0_out out = {};
    constant uint32_t* spvDescriptorSet0_uSampler0Swzl = &spvDescriptorSet0.spvSwizzleConstants[0];
    constant uint32_t& uSampler1Swzl = spvSwizzleConstants[0];
    out.FragColor = sample_in_func_1(spvDescriptorSet0.uSampler0, spvDescriptorSet0.uSampler0Smplr, spvDescriptorSet0_uSampler0Swzl, in.vUV);
    out.FragColor += sample_in_func_2(in.vUV, uSampler1, uSampler1Smplr, uSampler1Swzl);
    out.FragColor += sample_single_in_func(spvDescriptorSet0.uSampler0[1], spvDescriptorSet0.uSampler0Smplr[1], spvDescriptorSet0_uSampler0Swzl[1], in.vUV);
    out.FragColor += sample_single_in_func(uSampler1, uSampler1Smplr, uSampler1Swzl, in.vUV);
    return out;
}

